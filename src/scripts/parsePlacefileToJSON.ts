import * as fs from 'node:fs';
import path from 'node:path';

type HurricanePoint = {
  latitude: number;
  longitude: number;
  data: {
    date: string;
    pressure: number;
    temp: number;
    wind: {
      direction: number;
      speed: number;
    };
  };
};

export function parsePlacefileToJSON(placefileText: string): HurricanePoint[] {
  const objects = placefileText.split("Object:").slice(1);
  const hurricanePoints: HurricanePoint[] = [];

  for (const obj of objects) {
    const lines = obj.split("\n").map(line => line.trim()).filter(Boolean);
    const [latitude, longitude] = lines[0].split(",").map(Number);

    let date = "";
    let pressure: string | number = 0;
    let temp: string | number = 0;
    let windDirection: string | number = 0;
    let windSpeed: string | number = 0;

    for (const line of lines) {
      if (line.startsWith('Icon:')) {
        const [, , , , , data] = line.split(",");
        const dataParts = data?.match(/Date: (.*) UTC.*Aircraft Pres: (.*) mb.*Temp: (.*)°F.*Wind: (.*)° @ (.*) knots/);
        if (dataParts) {
          [, date, pressure, temp, windDirection, windSpeed] = dataParts;
          pressure = parseFloat(pressure);
          temp = parseFloat(temp);
          windDirection = parseInt(windDirection);
          windSpeed = parseFloat(windSpeed);
        }
      }
    }

    hurricanePoints.push({
      latitude,
      longitude,
      data: {
        date,
        pressure,
        temp,
        wind: {
          direction: windDirection,
          speed: windSpeed,
        },
      },
    });
  }

  console.log(`
    hurricanePoints: 
    
    ${hurricanePoints[5].data.pressure}

  `);

  return hurricanePoints;
}


// eslint-disable-next-line no-var
const placefileTextFile = `

Object: 24.233333333333334, -92.7
  Icon: 0,0,000,9,1,"Date: 19:20:30 UTC\nAircraft Pres: 439.1 mb\nTemp: 14.0°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 136° @ 40.82 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,136,1,16
  Text: -17,13,1,"Wind: 40.82 knots"
  Text: -17,-13,1,"Temp: 14.0°F"
End:

Object: 24.266666666666666, -92.68333333333334
  Icon: 0,0,000,9,1,"Date: 19:21:00 UTC\nAircraft Pres: 432 mb\nTemp: 12.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 134° @ 44.71 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,134,1,16
  Text: -17,13,1,"Wind: 44.71 knots"
  Text: -17,-13,1,"Temp: 12.6°F"
End:

Object: 24.3, -92.66666666666667
  Icon: 0,0,000,9,1,"Date: 19:21:30 UTC\nAircraft Pres: 425.1 mb\nTemp: 11.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 138° @ 34.99 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,138,1,16
  Text: -17,13,1,"Wind: 34.99 knots"
  Text: -17,-13,1,"Temp: 11.7°F"
End:

Object: 24.333333333333332, -92.63333333333334
  Icon: 0,0,000,9,1,"Date: 19:22:00 UTC\nAircraft Pres: 418.6 mb\nTemp: 10.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 146° @ 33.05 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,146,1,16
  Text: -17,13,1,"Wind: 33.05 knots"
  Text: -17,-13,1,"Temp: 10.6°F"
End:

Object: 24.366666666666667, -92.61666666666666
  Icon: 0,0,000,9,1,"Date: 19:22:30 UTC\nAircraft Pres: 413.2 mb\nTemp: 9.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 139° @ 29.16 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,139,1,16
  Text: -17,13,1,"Wind: 29.16 knots"
  Text: -17,-13,1,"Temp: 9.9°F"
End:

Object: 24.4, -92.6
  Icon: 0,0,000,9,1,"Date: 19:23:00 UTC\nAircraft Pres: 406.7 mb\nTemp: 8.8°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 127° @ 31.10 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,127,1,16
  Text: -17,13,1,"Wind: 31.10 knots"
  Text: -17,-13,1,"Temp: 8.8°F"
End:

Object: 24.416666666666668, -92.58333333333333
  Icon: 0,0,000,9,1,"Date: 19:23:30 UTC\nAircraft Pres: 400.5 mb\nTemp: 7.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 126° @ 21.38 knots (30sec avg)\nRain Rate: 1 mm/hr"
  Icon: 0,0,126,1,16
  Text: -17,13,1,"Wind: 21.38 knots"
  Text: -17,-13,1,"Temp: 7.5°F"
End:

Object: 24.45, -92.56666666666666
  Icon: 0,0,000,9,1,"Date: 19:24:00 UTC\nAircraft Pres: 394.3 mb\nTemp: 6.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 129° @ 21.38 knots (30sec avg)\nRain Rate: 6 mm/hr"
  Icon: 0,0,129,1,16
  Text: -17,13,1,"Wind: 21.38 knots"
  Text: -17,-13,1,"Temp: 6.4°F"
End:

Object: 24.483333333333334, -92.53333333333333
  Icon: 0,0,000,9,1,"Date: 19:24:30 UTC\nAircraft Pres: 390.2 mb\nTemp: 5.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 127° @ 23.33 knots (30sec avg)\nRain Rate: 6 mm/hr"
  Icon: 0,0,127,1,16
  Text: -17,13,1,"Wind: 23.33 knots"
  Text: -17,-13,1,"Temp: 5.5°F"
End:

Object: 24.516666666666666, -92.51666666666667
  Icon: 0,0,000,9,1,"Date: 19:25:00 UTC\nAircraft Pres: 385.5 mb\nTemp: 4.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 120° @ 29.16 knots (30sec avg)\nRain Rate: 7 mm/hr"
  Icon: 0,0,120,1,16
  Text: -17,13,1,"Wind: 29.16 knots"
  Text: -17,-13,1,"Temp: 4.6°F"
End:

Object: 24.55, -92.5
  Icon: 0,0,000,9,1,"Date: 19:25:30 UTC\nAircraft Pres: 380.7 mb\nTemp: 3.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 119° @ 34.99 knots (30sec avg)\nRain Rate: 5 mm/hr"
  Icon: 0,0,119,1,16
  Text: -17,13,1,"Wind: 34.99 knots"
  Text: -17,-13,1,"Temp: 3.7°F"
End:

Object: 24.583333333333332, -92.48333333333333
  Icon: 0,0,000,9,1,"Date: 19:26:00 UTC\nAircraft Pres: 376.9 mb\nTemp: 3.0°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 124° @ 34.99 knots (30sec avg)\nRain Rate: 1 mm/hr"
  Icon: 0,0,124,1,16
  Text: -17,13,1,"Wind: 34.99 knots"
  Text: -17,-13,1,"Temp: 3.0°F"
End:

Object: 24.616666666666667, -92.46666666666667
  Icon: 0,0,000,9,1,"Date: 19:26:30 UTC\nAircraft Pres: 375.7 mb\nTemp: 2.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 99° @ 33.05 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,99,1,16
  Text: -17,13,1,"Wind: 33.05 knots"
  Text: -17,-13,1,"Temp: 2.5°F"
End:

Object: 24.65, -92.45
  Icon: 0,0,000,9,1,"Date: 19:27:00 UTC\nAircraft Pres: 376.1 mb\nTemp: 2.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 89° @ 27.21 knots (30sec avg)\nRain Rate: 2 mm/hr"
  Icon: 0,0,89,1,16
  Text: -17,13,1,"Wind: 27.21 knots"
  Text: -17,-13,1,"Temp: 2.3°F"
End:

Object: 24.683333333333334, -92.41666666666667
  Icon: 0,0,000,9,1,"Date: 19:27:30 UTC\nAircraft Pres: 376.2 mb\nTemp: 2.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 115° @ 25.27 knots (30sec avg)\nRain Rate: 2 mm/hr"
  Icon: 0,0,115,1,16
  Text: -17,13,1,"Wind: 25.27 knots"
  Text: -17,-13,1,"Temp: 2.3°F"
End:

Object: 24.733333333333334, -92.4
  Icon: 0,0,000,9,1,"Date: 19:28:00 UTC\nAircraft Pres: 376.2 mb\nTemp: 1.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 111° @ 21.38 knots (30sec avg)\nRain Rate: 3 mm/hr"
  Icon: 0,0,111,1,16
  Text: -17,13,1,"Wind: 21.38 knots"
  Text: -17,-13,1,"Temp: 1.6°F"
End:

Object: 24.766666666666666, -92.38333333333334
  Icon: 0,0,000,9,1,"Date: 19:28:30 UTC\nAircraft Pres: 376 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 130° @ 27.21 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,130,1,16
  Text: -17,13,1,"Wind: 27.21 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 24.8, -92.36666666666666
  Icon: 0,0,000,9,1,"Date: 19:29:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 1.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 138° @ 23.33 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,138,1,16
  Text: -17,13,1,"Wind: 23.33 knots"
  Text: -17,-13,1,"Temp: 1.2°F"
End:

Object: 24.85, -92.33333333333333
  Icon: 0,0,000,9,1,"Date: 19:29:30 UTC\nAircraft Pres: 375.7 mb\nTemp: 1.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 145° @ 19.44 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,145,1,16
  Text: -17,13,1,"Wind: 19.44 knots"
  Text: -17,-13,1,"Temp: 1.2°F"
End:

Object: 24.883333333333333, -92.31666666666666
  Icon: 0,0,000,9,1,"Date: 19:30:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 124° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,124,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 0.3°F"
End:

Object: 24.916666666666668, -92.3
  Icon: 0,0,000,9,1,"Date: 19:30:30 UTC\nAircraft Pres: 376.4 mb\nTemp: -0.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 136° @ 17.49 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,136,1,16
  Text: -17,13,1,"Wind: 17.49 knots"
  Text: -17,-13,1,"Temp: -0.4°F"
End:

Object: 24.95, -92.26666666666667
  Icon: 0,0,000,9,1,"Date: 19:31:00 UTC\nAircraft Pres: 376.2 mb\nTemp: -0.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 134° @ 19.44 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,134,1,16
  Text: -17,13,1,"Wind: 19.44 knots"
  Text: -17,-13,1,"Temp: -0.4°F"
End:

Object: 25, -92.25
  Icon: 0,0,000,9,1,"Date: 19:31:30 UTC\nAircraft Pres: 376.1 mb\nTemp: -0.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 123° @ 17.49 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,123,1,16
  Text: -17,13,1,"Wind: 17.49 knots"
  Text: -17,-13,1,"Temp: -0.4°F"
End:

Object: 25.033333333333335, -92.23333333333333
  Icon: 0,0,000,9,1,"Date: 19:32:00 UTC\nAircraft Pres: 375.9 mb\nTemp: -0.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 131° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,131,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: -0.4°F"
End:

Object: 25.066666666666666, -92.21666666666667
  Icon: 0,0,000,9,1,"Date: 19:32:30 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 145° @ 19.44 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,145,1,16
  Text: -17,13,1,"Wind: 19.44 knots"
  Text: -17,-13,1,"Temp: 0.3°F"
End:

Object: 25.1, -92.18333333333334
  Icon: 0,0,000,9,1,"Date: 19:33:00 UTC\nAircraft Pres: 375.9 mb\nTemp: 0.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 150° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,150,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 0.3°F"
End:

Object: 25.133333333333333, -92.16666666666667
  Icon: 0,0,000,9,1,"Date: 19:33:30 UTC\nAircraft Pres: 375.9 mb\nTemp: 0.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 165° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,165,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 0.3°F"
End:

Object: 25.166666666666668, -92.15
  Icon: 0,0,000,9,1,"Date: 19:34:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 175° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,175,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 0.3°F"
End:

Object: 25.2, -92.13333333333334
  Icon: 0,0,000,9,1,"Date: 19:34:30 UTC\nAircraft Pres: 375.9 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 184° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,184,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 25.233333333333334, -92.11666666666666
  Icon: 0,0,000,9,1,"Date: 19:35:00 UTC\nAircraft Pres: 375.9 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 185° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,185,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 25.266666666666666, -92.08333333333333
  Icon: 0,0,000,9,1,"Date: 19:35:30 UTC\nAircraft Pres: 375.9 mb\nTemp: 0.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 190° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,190,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 0.9°F"
End:

Object: 25.3, -92.06666666666666
  Icon: 0,0,000,9,1,"Date: 19:36:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 195° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,195,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 0.7°F"
End:

Object: 25.333333333333332, -92.05
  Icon: 0,0,000,9,1,"Date: 19:36:30 UTC\nAircraft Pres: 376.1 mb\nTemp: 0.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 195° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,195,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 0.9°F"
End:

Object: 25.366666666666667, -92.03333333333333
  Icon: 0,0,000,9,1,"Date: 19:37:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 201° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,201,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 0.9°F"
End:

Object: 25.4, -92.01666666666667
  Icon: 0,0,000,9,1,"Date: 19:37:30 UTC\nAircraft Pres: 375.8 mb\nTemp: 1.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 204° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,204,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 1.2°F"
End:

Object: 25.4, -92.01666666666667
  Icon: 0,0,000,9,1,"Date: 19:38:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 1.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 181° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,181,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 1.2°F"
End:

Object: 25.483333333333334, -91.96666666666667
  Icon: 0,0,000,9,1,"Date: 19:38:30 UTC\nAircraft Pres: 376.2 mb\nTemp: 1.0°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 209° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,209,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 1.0°F"
End:

Object: 25.516666666666666, -91.95
  Icon: 0,0,000,9,1,"Date: 19:39:00 UTC\nAircraft Pres: 375.7 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 235° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,235,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 25.55, -91.93333333333334
  Icon: 0,0,000,9,1,"Date: 19:39:30 UTC\nAircraft Pres: 375.9 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 246° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,246,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 25.583333333333332, -91.91666666666667
  Icon: 0,0,000,9,1,"Date: 19:40:00 UTC\nAircraft Pres: 376 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 228° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,228,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 25.616666666666667, -91.9
  Icon: 0,0,000,9,1,"Date: 19:40:30 UTC\nAircraft Pres: 375.7 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 224° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,224,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 25.65, -91.86666666666666
  Icon: 0,0,000,9,1,"Date: 19:41:00 UTC\nAircraft Pres: 375.9 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 230° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,230,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 25.683333333333334, -91.85
  Icon: 0,0,000,9,1,"Date: 19:41:30 UTC\nAircraft Pres: 375.8 mb\nTemp: 1.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 230° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,230,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 1.9°F"
End:

Object: 25.716666666666665, -91.83333333333333
  Icon: 0,0,000,9,1,"Date: 19:42:00 UTC\nAircraft Pres: 375.9 mb\nTemp: 1.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 222° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,222,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 1.4°F"
End:

Object: 25.75, -91.81666666666666
  Icon: 0,0,000,9,1,"Date: 19:42:30 UTC\nAircraft Pres: 375.7 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 228° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,228,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 25.783333333333335, -91.8
  Icon: 0,0,000,9,1,"Date: 19:43:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 232° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,232,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 0.3°F"
End:

Object: 25.816666666666666, -91.76666666666667
  Icon: 0,0,000,9,1,"Date: 19:43:30 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 229° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,229,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 25.85, -91.75
  Icon: 0,0,000,9,1,"Date: 19:44:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 233° @ 7.78 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,233,1,16
  Text: -17,13,1,"Wind: 7.78 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 25.883333333333333, -91.73333333333333
  Icon: 0,0,000,9,1,"Date: 19:44:30 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 277° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,277,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 25.933333333333334, -91.7
  Icon: 0,0,000,9,1,"Date: 19:45:00 UTC\nAircraft Pres: 375.8 mb\nTemp: 0.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 294° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,294,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 0.9°F"
End:

Object: 25.966666666666665, -91.68333333333334
  Icon: 0,0,000,9,1,"Date: 19:45:30 UTC\nAircraft Pres: 375.9 mb\nTemp: 0.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 255° @ 7.78 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,255,1,16
  Text: -17,13,1,"Wind: 7.78 knots"
  Text: -17,-13,1,"Temp: 0.5°F"
End:

Object: 26, -91.66666666666667
  Icon: 0,0,000,9,1,"Date: 19:46:00 UTC\nAircraft Pres: 382.3 mb\nTemp: 1.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 276° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,276,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 1.9°F"
End:

Object: 26.05, -91.63333333333334
  Icon: 0,0,000,9,1,"Date: 19:46:30 UTC\nAircraft Pres: 391.6 mb\nTemp: 3.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 260° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,260,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 3.9°F"
End:

Object: 26.083333333333332, -91.61666666666666
  Icon: 0,0,000,9,1,"Date: 19:47:00 UTC\nAircraft Pres: 402 mb\nTemp: 5.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 226° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,226,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 5.7°F"
End:

Object: 26.133333333333333, -91.58333333333333
  Icon: 0,0,000,9,1,"Date: 19:47:30 UTC\nAircraft Pres: 410.4 mb\nTemp: 7.0°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 220° @ 15.55 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,220,1,16
  Text: -17,13,1,"Wind: 15.55 knots"
  Text: -17,-13,1,"Temp: 7.0°F"
End:

Object: 26.183333333333334, -91.55
  Icon: 0,0,000,9,1,"Date: 19:48:00 UTC\nAircraft Pres: 418.2 mb\nTemp: 9.1°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 213° @ 17.49 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,213,1,16
  Text: -17,13,1,"Wind: 17.49 knots"
  Text: -17,-13,1,"Temp: 9.1°F"
End:

Object: 26.216666666666665, -91.53333333333333
  Icon: 0,0,000,9,1,"Date: 19:48:30 UTC\nAircraft Pres: 424.3 mb\nTemp: 9.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 241° @ 17.49 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,241,1,16
  Text: -17,13,1,"Wind: 17.49 knots"
  Text: -17,-13,1,"Temp: 9.5°F"
End:

Object: 26.266666666666666, -91.5
  Icon: 0,0,000,9,1,"Date: 19:49:00 UTC\nAircraft Pres: 430.3 mb\nTemp: 10.8°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 238° @ 23.33 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,238,1,16
  Text: -17,13,1,"Wind: 23.33 knots"
  Text: -17,-13,1,"Temp: 10.8°F"
End:

Object: 26.316666666666666, -91.48333333333333
  Icon: 0,0,000,9,1,"Date: 19:49:30 UTC\nAircraft Pres: 437.3 mb\nTemp: 12.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 236° @ 25.27 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,236,1,16
  Text: -17,13,1,"Wind: 25.27 knots"
  Text: -17,-13,1,"Temp: 12.4°F"
End:

Object: 26.366666666666667, -91.45
  Icon: 0,0,000,9,1,"Date: 19:50:00 UTC\nAircraft Pres: 447.2 mb\nTemp: 13.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 232° @ 23.33 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,232,1,16
  Text: -17,13,1,"Wind: 23.33 knots"
  Text: -17,-13,1,"Temp: 13.6°F"
End:

Object: 26.4, -91.41666666666667
  Icon: 0,0,000,9,1,"Date: 19:50:30 UTC\nAircraft Pres: 457.3 mb\nTemp: 15.1°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 215° @ 21.38 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,215,1,16
  Text: -17,13,1,"Wind: 21.38 knots"
  Text: -17,-13,1,"Temp: 15.1°F"
End:

Object: 26.45, -91.4
  Icon: 0,0,000,9,1,"Date: 19:51:00 UTC\nAircraft Pres: 463.2 mb\nTemp: 16.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 205° @ 23.33 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,205,1,16
  Text: -17,13,1,"Wind: 23.33 knots"
  Text: -17,-13,1,"Temp: 16.9°F"
End:

Object: 26.5, -91.36666666666666
  Icon: 0,0,000,9,1,"Date: 19:51:30 UTC\nAircraft Pres: 480.4 mb\nTemp: 19.8°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 195° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,195,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 19.8°F"
End:

Object: 26.533333333333335, -91.33333333333333
  Icon: 0,0,000,9,1,"Date: 19:52:00 UTC\nAircraft Pres: 501.8 mb\nTemp: 23.4°F (30sec avg)\nDew: 22.1°F (30sec avg)\nWind: 221° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,221,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 23.4°F"
End:

Object: 26.583333333333332, -91.31666666666666
  Icon: 0,0,000,9,1,"Date: 19:52:30 UTC\nAircraft Pres: 507.1 mb\nTemp: 24.1°F (30sec avg)\nDew: 23.5°F (30sec avg)\nWind: 257° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,257,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 24.1°F"
End:

Object: 26.616666666666667, -91.3
  Icon: 0,0,000,9,1,"Date: 19:53:00 UTC\nAircraft Pres: 505.7 mb\nTemp: 24.1°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 263° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,263,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 24.1°F"
End:

Object: 26.666666666666668, -91.26666666666667
  Icon: 0,0,000,9,1,"Date: 19:53:30 UTC\nAircraft Pres: 505.8 mb\nTemp: 24.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 274° @ 5.83 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,274,1,16
  Text: -17,13,1,"Wind: 5.83 knots"
  Text: -17,-13,1,"Temp: 24.3°F"
End:

Object: 26.7, -91.25
  Icon: 0,0,000,9,1,"Date: 19:54:00 UTC\nAircraft Pres: 505.8 mb\nTemp: 24.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 300° @ 19.44 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,300,1,16
  Text: -17,13,1,"Wind: 19.44 knots"
  Text: -17,-13,1,"Temp: 24.4°F"
End:

Object: 26.75, -91.21666666666667
  Icon: 0,0,000,9,1,"Date: 19:54:30 UTC\nAircraft Pres: 506 mb\nTemp: 24.1°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 292° @ 29.16 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,292,1,16
  Text: -17,13,1,"Wind: 29.16 knots"
  Text: -17,-13,1,"Temp: 24.1°F"
End:

Object: 26.783333333333335, -91.2
  Icon: 0,0,000,9,1,"Date: 19:55:00 UTC\nAircraft Pres: 506 mb\nTemp: 24.8°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 286° @ 29.16 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,286,1,16
  Text: -17,13,1,"Wind: 29.16 knots"
  Text: -17,-13,1,"Temp: 24.8°F"
End:

Object: 26.816666666666666, -91.16666666666667
  Icon: 0,0,000,9,1,"Date: 19:55:30 UTC\nAircraft Pres: 505.8 mb\nTemp: 24.8°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 280° @ 23.33 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,280,1,16
  Text: -17,13,1,"Wind: 23.33 knots"
  Text: -17,-13,1,"Temp: 24.8°F"
End:

Object: 26.866666666666667, -91.15
  Icon: 0,0,000,9,1,"Date: 19:56:00 UTC\nAircraft Pres: 505.8 mb\nTemp: 24.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 268° @ 21.38 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,268,1,16
  Text: -17,13,1,"Wind: 21.38 knots"
  Text: -17,-13,1,"Temp: 24.4°F"
End:

Object: 26.9, -91.11666666666666
  Icon: 0,0,000,9,1,"Date: 19:56:30 UTC\nAircraft Pres: 505.8 mb\nTemp: 23.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 272° @ 19.44 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,272,1,16
  Text: -17,13,1,"Wind: 19.44 knots"
  Text: -17,-13,1,"Temp: 23.7°F"
End:

Object: 26.95, -91.1
  Icon: 0,0,000,9,1,"Date: 19:57:00 UTC\nAircraft Pres: 506.1 mb\nTemp: 23.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 282° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,282,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 23.9°F"
End:

Object: 26.983333333333334, -91.06666666666666
  Icon: 0,0,000,9,1,"Date: 19:57:30 UTC\nAircraft Pres: 505.8 mb\nTemp: 23.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 283° @ 7.78 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,283,1,16
  Text: -17,13,1,"Wind: 7.78 knots"
  Text: -17,-13,1,"Temp: 23.7°F"
End:

Object: 27.033333333333335, -91.05
  Icon: 0,0,000,9,1,"Date: 19:58:00 UTC\nAircraft Pres: 506 mb\nTemp: 23.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 278° @ 11.66 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,278,1,16
  Text: -17,13,1,"Wind: 11.66 knots"
  Text: -17,-13,1,"Temp: 23.9°F"
End:

Object: 27.066666666666666, -91.01666666666667
  Icon: 0,0,000,9,1,"Date: 19:58:30 UTC\nAircraft Pres: 505.8 mb\nTemp: 23.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 279° @ 7.78 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,279,1,16
  Text: -17,13,1,"Wind: 7.78 knots"
  Text: -17,-13,1,"Temp: 23.2°F"
End:

Object: 27.116666666666667, -91
  Icon: 0,0,000,9,1,"Date: 19:59:00 UTC\nAircraft Pres: 506 mb\nTemp: 22.8°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 290° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,290,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 22.8°F"
End:

Object: 27.15, -90.96666666666667
  Icon: 0,0,000,9,1,"Date: 19:59:30 UTC\nAircraft Pres: 506 mb\nTemp: 22.5°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 276° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,276,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 22.5°F"
End:

Object: 27.183333333333334, -90.95
  Icon: 0,0,000,9,1,"Date: 20:00:00 UTC\nAircraft Pres: 506.1 mb\nTemp: 22.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 262° @ 5.83 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,262,1,16
  Text: -17,13,1,"Wind: 5.83 knots"
  Text: -17,-13,1,"Temp: 22.3°F"
End:

Object: 27.233333333333334, -90.91666666666667
  Icon: 0,0,000,9,1,"Date: 20:00:30 UTC\nAircraft Pres: 506 mb\nTemp: 22.3°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 232° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,232,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 22.3°F"
End:

Object: 27.266666666666666, -90.9
  Icon: 0,0,000,9,1,"Date: 20:01:00 UTC\nAircraft Pres: 505.7 mb\nTemp: 21.9°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 216° @ 9.72 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,216,1,16
  Text: -17,13,1,"Wind: 9.72 knots"
  Text: -17,-13,1,"Temp: 21.9°F"
End:

Object: 27.316666666666666, -90.86666666666666
  Icon: 0,0,000,9,1,"Date: 20:01:30 UTC\nAircraft Pres: 505.8 mb\nTemp: 21.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 262° @ 13.61 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,262,1,16
  Text: -17,13,1,"Wind: 13.61 knots"
  Text: -17,-13,1,"Temp: 21.6°F"
End:

Object: 27.35, -90.85
  Icon: 0,0,000,9,1,"Date: 20:02:00 UTC\nAircraft Pres: 505.9 mb\nTemp: 22.1°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 260° @ 7.78 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,260,1,16
  Text: -17,13,1,"Wind: 7.78 knots"
  Text: -17,-13,1,"Temp: 22.1°F"
End:

Object: 27.4, -90.83333333333333
  Icon: 0,0,000,9,1,"Date: 20:02:30 UTC\nAircraft Pres: 506 mb\nTemp: 21.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 268° @ 1.94 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,268,1,16
  Text: -17,13,1,"Wind: 1.94 knots"
  Text: -17,-13,1,"Temp: 21.6°F"
End:

Object: 27.433333333333334, -90.8
  Icon: 0,0,000,9,1,"Date: 20:03:00 UTC\nAircraft Pres: 505.8 mb\nTemp: 21.7°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 357° @ 1.94 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,357,1,16
  Text: -17,13,1,"Wind: 1.94 knots"
  Text: -17,-13,1,"Temp: 21.7°F"
End:

Object: 27.483333333333334, -90.78333333333333
  Icon: 0,0,000,9,1,"Date: 20:03:30 UTC\nAircraft Pres: 505.9 mb\nTemp: 21.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 104° @ 1.94 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,104,1,16
  Text: -17,13,1,"Wind: 1.94 knots"
  Text: -17,-13,1,"Temp: 21.4°F"
End:

Object: 27.516666666666666, -90.75
  Icon: 0,0,000,9,1,"Date: 20:04:00 UTC\nAircraft Pres: 506.4 mb\nTemp: 21.6°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 285° @ 1.94 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,285,1,16
  Text: -17,13,1,"Wind: 1.94 knots"
  Text: -17,-13,1,"Temp: 21.6°F"
End:

Object: 27.55, -90.73333333333333
  Icon: 0,0,000,9,1,"Date: 20:04:30 UTC\nAircraft Pres: 506.2 mb\nTemp: 21.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 307° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,307,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 21.2°F"
End:

Object: 27.6, -90.7
  Icon: 0,0,000,9,1,"Date: 20:05:00 UTC\nAircraft Pres: 506 mb\nTemp: 21.4°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 331° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,331,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 21.4°F"
End:

Object: 27.633333333333333, -90.68333333333334
  Icon: 0,0,000,9,1,"Date: 20:05:30 UTC\nAircraft Pres: 505.9 mb\nTemp: 21.2°F (30sec avg)\nDew: NaN°F (30sec avg)\nWind: 51° @ 3.89 knots (30sec avg)\nRain Rate: 0 mm/hr"
  Icon: 0,0,51,1,16
  Text: -17,13,1,"Wind: 3.89 knots"
  Text: -17,-13,1,"Temp: 21.2°F"
End:`;




const placefileData = parsePlacefileToJSON(placefileTextFile);

const placefileDataString = JSON.stringify(placefileData)

const filePath = path.join(process.cwd(), 'placefile.json');
fs.writeFileSync(filePath, placefileDataString, 'utf-8');