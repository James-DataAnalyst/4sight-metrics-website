4Sight Metrics — Gray Tool Icons

Purpose
These SVG files are designed only for the moving tools marquee in the hero.
Keep the original-colour icons in the Business data and Intelligence layer visual.

Destination
Copy the SVG files into:
assets/icons/tools/gray/

Files
excel-gray.svg
azure-gray.svg
snowflake-gray.svg
databricks-gray.svg
deneb-gray.svg
postgresql-gray.svg
power-bi-gray.svg
microsoft-fabric-gray.svg
sql-gray.svg

Recommended site-data.js structure
{
  name: "Excel",
  icon: "assets/icons/tools/excel.svg",
  heroIcon: "assets/icons/tools/gray/excel-gray.svg"
}

Recommended app.js image source inside renderToolMarquee()
src="${escapeHTML(tool.heroIcon || tool.icon)}"

Recommended CSS
.tool-logo img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: none;
  opacity: 0.92;
}

Palette
Light: #D7E1E8 / #B7C6D2
Main:  #8FA4B5
Dark:  #647B8E
