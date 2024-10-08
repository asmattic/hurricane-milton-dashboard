import { NextResponse } from 'next/server';
import hurricaneData from '../../../data/hurricane_data.json'

export async function GET() {
  /*const hurricaneData = [
    {
      latitude: 24.2333,
      longitude: -92.7,
      data: {
        date: '19:20:30 UTC',
        pressure: 439.1,
        temp: 14.0,
        wind: {
          direction: 136,
          speed: 40.82,
        },
      },
    },
    {
      "latitude": 24.233333333333334,
      "longitude": -92.7,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.266666666666666,
      "longitude": -92.68333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.3,
      "longitude": -92.66666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.333333333333332,
      "longitude": -92.63333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.366666666666667,
      "longitude": -92.61666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.4,
      "longitude": -92.6,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.416666666666668,
      "longitude": -92.58333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.45,
      "longitude": -92.56666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.483333333333334,
      "longitude": -92.53333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.516666666666666,
      "longitude": -92.51666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.55,
      "longitude": -92.5,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.583333333333332,
      "longitude": -92.48333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.616666666666667,
      "longitude": -92.46666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.65,
      "longitude": -92.45,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.683333333333334,
      "longitude": -92.41666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.733333333333334,
      "longitude": -92.4,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.766666666666666,
      "longitude": -92.38333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.8,
      "longitude": -92.36666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.85,
      "longitude": -92.33333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.883333333333333,
      "longitude": -92.31666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.916666666666668,
      "longitude": -92.3,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 24.95,
      "longitude": -92.26666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25,
      "longitude": -92.25,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.033333333333335,
      "longitude": -92.23333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.066666666666666,
      "longitude": -92.21666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.1,
      "longitude": -92.18333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.133333333333333,
      "longitude": -92.16666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.166666666666668,
      "longitude": -92.15,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.2,
      "longitude": -92.13333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.233333333333334,
      "longitude": -92.11666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.266666666666666,
      "longitude": -92.08333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.3,
      "longitude": -92.06666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.333333333333332,
      "longitude": -92.05,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.366666666666667,
      "longitude": -92.03333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.4,
      "longitude": -92.01666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.4,
      "longitude": -92.01666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.483333333333334,
      "longitude": -91.96666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.516666666666666,
      "longitude": -91.95,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.55,
      "longitude": -91.93333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.583333333333332,
      "longitude": -91.91666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.616666666666667,
      "longitude": -91.9,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.65,
      "longitude": -91.86666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.683333333333334,
      "longitude": -91.85,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.716666666666665,
      "longitude": -91.83333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.75,
      "longitude": -91.81666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.783333333333335,
      "longitude": -91.8,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.816666666666666,
      "longitude": -91.76666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.85,
      "longitude": -91.75,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.883333333333333,
      "longitude": -91.73333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.933333333333334,
      "longitude": -91.7,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 25.966666666666665,
      "longitude": -91.68333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26,
      "longitude": -91.66666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.05,
      "longitude": -91.63333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.083333333333332,
      "longitude": -91.61666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.133333333333333,
      "longitude": -91.58333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.183333333333334,
      "longitude": -91.55,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.216666666666665,
      "longitude": -91.53333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.266666666666666,
      "longitude": -91.5,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.316666666666666,
      "longitude": -91.48333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.366666666666667,
      "longitude": -91.45,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.4,
      "longitude": -91.41666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.45,
      "longitude": -91.4,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.5,
      "longitude": -91.36666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.533333333333335,
      "longitude": -91.33333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.583333333333332,
      "longitude": -91.31666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.616666666666667,
      "longitude": -91.3,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.666666666666668,
      "longitude": -91.26666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.7,
      "longitude": -91.25,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.75,
      "longitude": -91.21666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.783333333333335,
      "longitude": -91.2,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.816666666666666,
      "longitude": -91.16666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.866666666666667,
      "longitude": -91.15,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.9,
      "longitude": -91.11666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.95,
      "longitude": -91.1,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 26.983333333333334,
      "longitude": -91.06666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.033333333333335,
      "longitude": -91.05,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.066666666666666,
      "longitude": -91.01666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.116666666666667,
      "longitude": -91,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.15,
      "longitude": -90.96666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.183333333333334,
      "longitude": -90.95,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.233333333333334,
      "longitude": -90.91666666666667,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.266666666666666,
      "longitude": -90.9,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.316666666666666,
      "longitude": -90.86666666666666,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.35,
      "longitude": -90.85,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.4,
      "longitude": -90.83333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.433333333333334,
      "longitude": -90.8,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.483333333333334,
      "longitude": -90.78333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.516666666666666,
      "longitude": -90.75,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.55,
      "longitude": -90.73333333333333,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.6,
      "longitude": -90.7,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    },
    {
      "latitude": 27.633333333333333,
      "longitude": -90.68333333333334,
      "data": {
        "date": "",
        "pressure": 0,
        "temp": 0,
        "wind": {
          "direction": 0,
          "speed": 0
        }
      }
    }

  ] as const;*/
  return NextResponse.json(hurricaneData);
}