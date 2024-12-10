const fs = require('fs');
const path = require('path');

// Paths to your JSON files
const filePaths = [
  path.join(__dirname, 'produktyA.json'),
  path.join(__dirname, 'produktyB.json'),
  path.join(__dirname, 'produktyC.json'),
];

// Helper to deduplicate items in categories
const deduplicate = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// Merge logic
const mergeFiles = (files) => {
  const mergedData = {
    products: {} // Initialize the "products" wrapper
  };

  files.forEach((file) => {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    Object.keys(data).forEach((category) => {
      if (!mergedData.products[category]) {
        mergedData.products[category] = [];
      }
      mergedData.products[category] = deduplicate([
        ...mergedData.products[category], 
        ...data[category]
      ]);
    });
  });

  return mergedData;
};

// Write combined data to db.json
const saveToFile = (data, outputPath) => {
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Merged JSON saved to', outputPath);
};

// Execution
const mergedData = mergeFiles(filePaths);
const outputFilePath = path.join(__dirname, 'db.json');
saveToFile(mergedData, outputFilePath);
