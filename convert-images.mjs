import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputDir = 'public'
const outputDir = 'public'

// List of images to convert
const imagesToConvert = [
  { input: 'wood.jpg', output: 'wood.webp', width: 1200 },
  { input: 'jonas2.jpg', output: 'jonas2.webp', width: 160, height: 160 },
  { input: 'line.png', output: 'line.webp', width: 800, height: 20 },
]

async function convertImages() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const image of imagesToConvert) {
    const inputPath = path.join(inputDir, image.input)
    const outputPath = path.join(outputDir, image.output)

    try {
      console.log(`Converting ${inputPath} to ${outputPath}...`)

      let processor = sharp(inputPath)

      // Resize if dimensions are provided
      if (image.width && image.height) {
        processor = processor.resize(image.width, image.height, {
          fit: 'cover',
        })
      } else if (image.width) {
        processor = processor.resize(image.width)
      }

      // Convert to WebP with good quality
      await processor.webp({ quality: 85 }).toFile(outputPath)

      console.log(`Successfully converted ${image.input} to WebP format.`)
    } catch (error) {
      console.error(`Error converting ${image.input}:`, error)
    }
  }
}

convertImages()
  .then(() => {
    console.log('Image conversion complete!')
  })
  .catch((err) => {
    console.error('Error in conversion process:', err)
  })
