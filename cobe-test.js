const fs = require('fs');

// We don't have cobe in node environment, but we can render a simple html page and serve it locally or just trust that phi = lng * Math.PI / 180
// Let's create an html file that we can check.
// I will just open a script that creates a small cobe globe and calculates the center.
const html = `
<!DOCTYPE html>
<html>
<body>
<canvas id="clobe" width="400" height="400"></canvas>
<script type="module">
  import createGlobe from 'https://cdn.skypack.dev/cobe';
  createGlobe(document.getElementById('clobe'), {
    devicePixelRatio: 1,
    width: 400,
    height: 400,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.0,
    mapSamples: 16000,
    mapBrightness: 5,
    baseColor: [0.16, 0.12, 0.08],
    markerColor: [1, 0, 0], // red
    glowColor: [0.2, 0.15, 0.1],
    opacity: 0.95,
    markers: [{ location: [7.9465, -1.0232], size: 0.2 }], // Ghana
    onRender: (state) => {
        // try to center ghana
        state.phi = - -1.0232 * (Math.PI / 180);
        state.theta = - 7.9465 * (Math.PI / 180);
    }
  });
</script>
</body>
</html>
`;
fs.writeFileSync('C:\\Users\\Asus\\OneDrive\\Desktop\\QASHEW COMPANY\\cobe-test.html', html);
console.log('Test file created');
