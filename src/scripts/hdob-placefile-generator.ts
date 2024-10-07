//import fetch from 'node-fetch';
import * as fs from 'node:fs';
import * as path from 'path';
import { load } from 'cheerio';

// Configuration object
const config = {
  baseUrl: 'https://www.nhc.noaa.gov/archive/recon/2024/', // Base URL for the NHC recon archive
  hoursBack: 1,  // Hours to go back into archive
  windbarbIcons: './assets/Basic_WindBarb_096.png', // Path to windbarb icons image file  // TODO: Need to fix object windbard icon
  airplaneIcon: './assets/airplane.png', // Path to airplane icon image file
  units: 'imperial',  // imperial or metric
  outputFilePath: './hdob_placefile.txt',  // Path to save placefile
  refreshInterval: 10,  // Placefile refresh interval in seconds
  titlePrefix: 'Hurricane Hunter',  // Prefix for the title of the placefile
  color: [200, 200, 255],  // Color in RGB format for the placefile header
  timeFormat: '24h',  // '12h' or '24h' time format for timestamps
  pressureUnit: 'mb',  // Pressure unit, can be 'mb' or 'inHg'
  rainRateUnit: 'mm/hr',  // Rain rate unit, can be 'mm/hr' or 'in/hr'
  temperaturePrecision: 1,  // Precision for temperature conversion
  windSpeedPrecision: 2  // Precision for wind speed conversion
};

// Function to fetch the list of storm directories
async function fetchStormDirectories() {
  try {
    const response = await fetch(config.baseUrl);
    if (response.ok) {
      const html = await response.text();
      const $ = load(html);

      const stormDirs: Array<string> = [];

      $('a').each((i, link) => {
        const href = $(link).attr('href');
        // Skip root directories or parent directories that are not valid storm directories
        if (href && href.endsWith('/') && href !== '/' && href !== '../') {
          // Check if the href starts with a valid storm prefix (like 'AHONT1/', etc.)
          const stormPattern = /^[A-Z]+[0-9]+\/$/;
          if (stormPattern.test(href)) {
            stormDirs.push(href);
          }
        }
      });

      return stormDirs;
    } else {
      console.error(`Failed to fetch storm directories: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching storm directories:`, error);
    return [];
  }
}

// Function to fetch HDOB files from a storm directory
async function fetchHdobFiles(stormDir: string) {
  const stormUrl = `${config.baseUrl}${stormDir}`;
  try {
    const response = await fetch(stormUrl);
    if (response.ok) {
      const html = await response.text();
      const $ = load(html);

      const links = $('a');

      const hdobFiles: Array<string> = [];
      const now = new Date();

      links.each((i, link) => {
        const href = $(link).attr('href');
        if (href && href.endsWith('.txt')) {
          const filename = href;

          // Extract the date and time from the file listing
          const dateString = $(link).parent().next().text().trim();
          const fileDate = new Date(dateString);

          // Calculate the time difference
          const timeDiff = (Number(now) - Number(fileDate)) / (1000 * 60 * 60); // Difference in hours

          if (timeDiff <= config.hoursBack) {
            hdobFiles.push(`${stormUrl}${filename}`);
          }
        }
      });

      return hdobFiles;
    } else {
      console.error(`Failed to fetch HDOB files from ${stormDir}: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching HDOB files from ${stormDir}:`, error);
    return [];
  }
}

// Function to parse coordinates from HDOB format to decimal degrees
function parseCoordinate(coord: string) {
  const length = coord.length;
  const hemisphere = coord[length - 1];
  const isNegative = hemisphere === 'S' || hemisphere === 'W';

  let deg, min;
  if (length === 5) {
    // Latitude: ddmmH
    deg = parseInt(coord.slice(0, 2));
    min = parseInt(coord.slice(2, 4));
  } else if (length === 6) {
    // Longitude: dddmmH
    deg = parseInt(coord.slice(0, 3));
    min = parseInt(coord.slice(3, 5));
  } else {
    console.error(`Invalid coordinate format: ${coord}`);
    return null;
  }

  const decimalDegrees = deg + (min / 60);
  return isNegative ? -decimalDegrees : decimalDegrees;
}

// Function to extract relevant HDOB entries from the raw data
function extractHdobEntries(rawData: string) {
  const hdobEntries: Array<object> = [];
  const lines = rawData.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (!/^\d{6}/.test(trimmedLine)) continue;

    const fields = trimmedLine.split(/\s+/);

    if (fields.length < 10) continue;

    const hhmmss = fields[0];
    const LLLLH = fields[1];
    const NNNNNH = fields[2];
    const PPPP = fields[3];
    // const GGGGG = fields[4];  // these values aren't currently used
    // const XXXX = fields[5];  // these values aren't currently used
    const sTTT = fields[6];
    const sddd = fields[7];
    const wwwSSS = fields[8];
    // const MMM = fields[9];  // these values aren't currently used
    // const KKK = fields[10] || '///';  // these values aren't currently used
    const ppp = fields[11] || '///';

    const latitude = parseCoordinate(LLLLH);
    const longitude = parseCoordinate(NNNNNH);
    const pressure = PPPP !== '////' ? parseInt(PPPP) / 10 : 'N/A';
    const temperature = sTTT !== '///' ? parseInt(sTTT) / 10 : 'N/A';
    const dewPoint = sddd !== '///' ? parseInt(sddd) / 10 : 'N/A';
    const windDir = wwwSSS !== '//////' ? parseInt(wwwSSS.slice(0, 3)) : 'N/A';
    const windSpeed = wwwSSS !== '//////' ? parseInt(wwwSSS.slice(3)) : 'N/A';
    const rainRate = ppp !== '///' ? parseInt(ppp) : 'N/A';

    hdobEntries.push({
      latitude,
      longitude,
      pressure,
      windSpeed,
      temperature,
      dewPoint,
      windDir,
      rainRate,
      timestamp: hhmmss,
      questionable: sTTT === '///' || sddd === '///' || wwwSSS === '//////'
    });
  }

  return hdobEntries;
}

// Function to convert temperature and wind speed based on unit type
function convertUnits(value: number, type: string, unit: string) {
  if (unit === 'imperial') {
    if (type === 'temperature') {
      return (value * 9 / 5 + 32).toFixed(1);  // Convert Celsius to Fahrenheit
    } else if (type === 'wind') {
      return (value * 1.94384).toFixed(config.windSpeedPrecision);  // Convert m/s to knots
    }
  }
  return value.toFixed(config.temperaturePrecision); // Return metric value
}

// Function to format the time based on 12h or 24h format
function formatTime(timestamp: string, format: string) {
  const hours = parseInt(timestamp.slice(0, 2));
  const minutes = timestamp.slice(2, 4);
  const seconds = timestamp.slice(4);

  if (format === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    return `${formattedHour}:${minutes}:${seconds} ${period}`;
  }

  return `${hours}:${minutes}:${seconds}`; // 24-hour format
}

type HdobEntries = {
  latitude: number,
  longitude: number,
  pressure: number,
  windSpeed: number,
  temperature: number,
  dewPoint: number,
  windDir: number | string,
  rainRate: number,
  timestamp: string,
  questionable: number
};

// Convert HDOB entries to Placefile format with the required template
function convertToPlacefile(hdobEntries: HdobEntries[]) {
  const now = new Date().toUTCString();
  const color = config.color.join(' ');

  const placefileHeader = `
Refresh: ${config.refreshInterval}
Title: ${config.titlePrefix} - ${now}
Color: ${color}
Font: 1, 11, 1, "Courier New"
Threshold: 999

IconFile: 1, 18, 44, 3, 40, "${config.windbarbIcons}"
IconFile: 9, 15, 15, 7, 7, "${config.airplaneIcon}"
`;

  const placefileData = hdobEntries.map((entry) => {
    const {
      latitude,
      longitude,
      pressure,
      windSpeed,
      temperature,
      dewPoint,
      windDir,
      rainRate,
      timestamp,
      questionable
    } = entry;

    const windDirValue = windDir !== 'N/A' ? windDir : 0;
    const windDirectionText = `${windDirValue}°`;

    // Convert units
    const windSpeedText = `${convertUnits(windSpeed, 'wind', config.units)} knots`;
    const temperatureText = `${convertUnits(temperature, 'temperature', config.units)}°${config.units === 'imperial' ? 'F' : 'C'}`;
    const dewPointText = `${convertUnits(dewPoint, 'temperature', config.units)}°${config.units === 'imperial' ? 'F' : 'C'}`;
    const rainRateText = `${rainRate} ${config.rainRateUnit}`;
    const pressureText = `${pressure} ${config.pressureUnit}`;

    // Observation text including questionable data note
    let observationText = `Date: ${formatTime(timestamp, config.timeFormat)} UTC\n` +
      `Aircraft Pres: ${pressureText}\n` +
      `Temp: ${temperatureText} (30sec avg)\n` +
      `Dew: ${dewPointText} (30sec avg)\n` +
      `Wind: ${windDirectionText} @ ${windSpeedText} (30sec avg)\n` +
      `Rain Rate: ${rainRateText}`;

    if (questionable) {
      observationText += `\n* denotes questionable data`;
    }

    return `
Object: ${latitude}, ${longitude}
  Icon: 0,0,000,9,1,"${observationText.replace(/\n/g, '\\n')}"
  Icon: 0,0,${windDirValue},1,16
  Text: -17,13,1,"Wind: ${windSpeedText}"
  Text: -17,-13,1,"Temp: ${temperatureText}"
End:
`;
  }).join('');

  return placefileHeader + placefileData;
}

// Function to save Placefile data to a file
function savePlacefile(placefileData: string) {
  const filePath = path.join(process.cwd(), config.outputFilePath);
  fs.writeFileSync(filePath, placefileData, 'utf-8');
  console.log(`Placefile data saved to ${filePath}`);
}

// Main function to run the entire process
async function generatePlacefile() {
  let allHdobEntries: HdobEntries[] = [];

  const stormDirs = await fetchStormDirectories();

  for (const stormDir of stormDirs) {
    const hdobFiles = await fetchHdobFiles(stormDir.toString());

    if (hdobFiles.length > 0) {
      console.log(`Found ${hdobFiles.length} HDOB files in ${stormDir}`);
      for (const hdobFile of hdobFiles) {
        try {
          const hdobFileUrl = new URL(hdobFile.toString());
          const response = await fetch(hdobFileUrl.href);
          if (response.ok) {
            const text = await response.text();
            const entries = extractHdobEntries(text);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            allHdobEntries = allHdobEntries.concat(entries);
          }
        } catch (err) {
          console.error(`Error fetching ${hdobFile}:`, err);
        }
      }
    }
  }

  if (allHdobEntries.length > 0) {
    const placefileData = convertToPlacefile(allHdobEntries);
    savePlacefile(placefileData);
  } else {
    console.log('No HDOB data found.');
  }
}

// Run the script to generate the placefile
generatePlacefile();
