import * as fs from 'fs';

interface IconFile {
  id: number;
  size: number[];
  anchor: number[];
  path: string;
}

interface Font {
  type: number;
  size: number;
  style: number;
  family: string;
}

interface Metadata {
  refresh: number;
  title: string;
  color: number[];
  font: Font;
  threshold: number;
  icon_files: IconFile[];
}

interface Wind {
  direction: string;
  speed_knots: number;
}

interface IconData {
  date: string;
  aircraft_pres: string;
  temp: string;
  dew: string;
  wind: Wind;
  rain_rate: string;
}

interface Icon {
  icon_data: IconData;
  icon_code: number;
}

interface HurricaneObject {
  coordinates: number[];
  icons: Icon[];
}

interface HurricaneData {
  metadata: Metadata;
  objects: HurricaneObject[];
}

function parseHurricaneData(filePath: string): HurricaneData {
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

  const metadata: Metadata = {
    refresh: 0,
    title: '',
    color: [],
    font: { type: 0, size: 0, style: 0, family: '' },
    threshold: 0,
    icon_files: []
  };
  const objects: HurricaneObject[] = [];
  let currentObject: HurricaneObject | null = null;

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith('Refresh:')) {
      metadata.refresh = parseInt(line.split(':')[1].trim(), 10);
    } else if (line.startsWith('Title:')) {
      metadata.title = line.split(':')[1].trim();
    } else if (line.startsWith('Color:')) {
      metadata.color = line.split(':')[1].split(' ').map(Number);
    } else if (line.startsWith('Font:')) {
      const fontParams = line.split(':')[1].split(',');
      metadata.font = {
        type: parseInt(fontParams[0].trim(), 10),
        size: parseInt(fontParams[1].trim(), 10),
        style: parseInt(fontParams[2].trim(), 10),
        family: fontParams[3].trim().replace(/"/g, '')
      };
    } else if (line.startsWith('Threshold:')) {
      metadata.threshold = parseInt(line.split(':')[1].trim(), 10);
    } else if (line.startsWith('IconFile:')) {
      const iconParams = line.split(':')[1].split(',');
      metadata.icon_files.push({
        id: parseInt(iconParams[0].trim(), 10),
        size: [parseInt(iconParams[1].trim(), 10), parseInt(iconParams[2].trim(), 10)],
        anchor: [parseInt(iconParams[3].trim(), 10), parseInt(iconParams[4].trim(), 10)],
        path: iconParams[5].trim().replace(/"/g, '')
      });
    } else if (line.startsWith('Object:')) {
      // If there was a previous object, save it
      if (currentObject) {
        objects.push(currentObject);
      }
      const coords = line.split(':')[1].split(',').map(coord => parseFloat(coord.trim()));
      currentObject = { coordinates: coords, icons: [] };
    } else if (line.startsWith('Icon:') && currentObject) {
      const iconParams = line.split(',');
      const windRegex = /Wind: (\d+°) @ ([\d.]+) knots/;
      const match = windRegex.exec(iconParams[5]);
      if (match) {
        const windDirection = match[1];
        const windSpeed = parseFloat(match[2]);
        const iconData: IconData = {
          date: iconParams[5].match(/Date: ([\d:]+ UTC)/)?.[1] || '',
          aircraft_pres: iconParams[5].match(/Aircraft Pres: ([\d.]+ mb)/)?.[1] || '',
          temp: iconParams[5].match(/Temp: ([\d.]+°F)/)?.[1] || '',
          dew: iconParams[5].match(/Dew: ([\d.]+°F)/)?.[1] || '',
          wind: {
            direction: windDirection,
            speed_knots: windSpeed
          },
          rain_rate: iconParams[5].match(/Rain Rate: (N\/A mm\/hr)/)?.[1] || ''
        };
        currentObject.icons.push({ icon_data: iconData, icon_code: parseInt(iconParams[2], 10) });
      }
    } else if (line === 'End:' && currentObject) {
      objects.push(currentObject);
      currentObject = null;
    }
  });

  return { metadata, objects };
}

// Example usage
const filePath = '../data/hdob_placefile.txt';  // Path to your input file
const hurricaneData = parseHurricaneData(filePath);

// Output the resulting JSON
fs.writeFileSync('hurricane_data.json', JSON.stringify(hurricaneData, null, 2));
console.log('Hurricane data converted to JSON and saved as hurricane_data.json', hurricaneData.objects[1]);