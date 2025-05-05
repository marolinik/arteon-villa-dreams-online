
# Images Folder

This folder contains all the images used throughout the website.

## Organization
- `villas/`: Images of the individual villas
- `amenities/`: Images of property amenities (pool, BBQ area, etc.)
- `surroundings/`: Images of beaches and local attractions
- `interiors/`: Images of villa interiors
- `exteriors/`: Images of villa exteriors

## Usage
Import images from this folder in your components:

```tsx
// Example usage
import villaImage from "@/images/villas/villa-arteon.jpg";

const MyComponent = () => {
  return <img src={villaImage} alt="Arteon Villa" />;
};
```
