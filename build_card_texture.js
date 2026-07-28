const sharp = require('sharp');
const fs = require('fs');

async function generateCardTexture() {
  const originalPath = 'public/assets/original_card_texture.png';
  const portraitPath = 'C:/Users/punja/.gemini/antigravity/brain/0a6d59c0-b433-488a-bb59-5215985526b0/ali_3d_card_portrait_1785077120932.png';
  const outputPath = 'public/assets/PP.png';

  // Target portrait dimensions for left box of 3D card
  const frameWidth = 218;
  const frameHeight = 343;
  const frameLeft = 17;
  const frameTop = 22;
  const borderRadius = 18;

  // 1. Prepare portrait cropped & fitted to frame dimensions with rounded corners mask
  const roundedCornersSvg = Buffer.from(`
    <svg width="${frameWidth}" height="${frameHeight}">
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="#fff"/>
    </svg>
  `);

  const fittedPortrait = await sharp(portraitPath)
    .resize(frameWidth, frameHeight, {
      fit: 'cover',
      position: 'centre'
    })
    .composite([{
      input: roundedCornersSvg,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // 2. Prepare text overlay for back of the card ("ALI HAIDER")
  // Replace "RIFQI M.A" text on the right side
  const nameOverlaySvg = Buffer.from(`
    <svg width="512" height="512">
      <!-- Cover old text with background color -->
      <rect x="250" y="315" width="240" height="50" fill="#c1c1c1"/>
      <!-- New Name Text -->
      <text x="360" y="340" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#111111" text-anchor="middle" letter-spacing="1">ALI HAIDER</text>
    </svg>
  `);

  // 3. Composite everything onto original_card_texture.png
  await sharp(originalPath)
    .composite([
      {
        input: fittedPortrait,
        top: frameTop,
        left: frameLeft
      },
      {
        input: nameOverlaySvg,
        top: 0,
        left: 0
      }
    ])
    .toFile(outputPath);

  console.log('Successfully created composite 3D card texture at:', outputPath);
}

generateCardTexture().catch(console.error);
