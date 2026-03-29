import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceCurrency(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceCurrency(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const original = content;

      // 1. replace > \n $ { with > \n ₹ {
      content = content.replace(/>([\s\n]*)\$([\s\n]*)\{/g, '>$1₹$2{');
      
      // 2. replace ( \n $ { with ( \n ₹ {
      content = content.replace(/\(([\s\n]*)\$([\s\n]*)\{/g, '($1₹$2{');

      // 3. replace $50 with ₹50 and $10 with ₹10 etc.
      content = content.replace(/\$([0-9]+)/g, '₹$1');

      // 4. replace `$$` or `$${` which are template literals showing $ sign
      // Note: `$${val}` matches `\$\$\{`. We want `₹\$\{`.
      content = content.replace(/\$\$\{/g, '₹${');

      // 5. replace Price ($)
      content = content.replace(/Price \(\$\)/g, 'Price (₹)');
      content = content.replace(/Discount Price \(\$\)/g, 'Discount Price (₹)');

      // 6. Free Delivery over $50
      content = content.replace(/over \$([0-9]+)/g, 'over ₹$1');

      // 7. e.g. `$${` inside JSX strings like: `$${shipping.toFixed(2)}`
      content = content.replace(/`\$(\$\{)/g, '`₹$1');

      // Write if changed
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Replaced in ${fullPath}`);
      }
    }
  }
}

replaceCurrency(path.join(__dirname, 'src'));
console.log('Script completed.');
