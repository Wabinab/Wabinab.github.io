# Angular 17 `ng build` failed to compile because 'No loader is configured for ".woff2" files'
technology bug issue

One had a program that was built with Angular 17, but when one tried to run `ng build`, it had a problem. 

```
No loader is configured for ".woff2" files: node_modules/mathlive/fonts/KaTeX_Caligraphic-Bold.woff2

    node_modules/mathlive/mathlive-fonts.css:1:254:
      1 │ ...ight:700;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format("wof...
```

This line kept repeating itself in the console. It's caused by a library called `mathlive` that one used to, well, render math. (No, don't ask me why one don't use alternative library; there's a reason why I use this library instead of other rendering libraries, and that one won't go into details). One never tried to run `ng build` before, and with `ng serve`, everything ran fine. So now we have to solve the problem. 

As you've noticed, if one had refused to install mathlive locally on the computer using `npm install`, and instead pull the script and css from CDN instead, everything would be solved. That's the easy way. Unfortunately, my client refused to connect the computer to the internet for security issues, so everything needs to run locally; and CDN is just not a viable option. Does this alredy spark your creativity? 

If one hadn't used Angular 17, but used, say, vanilla Webpack or ESBuild, one might be able to modify the webpack.config.json or the equivalent in ESBuild, to configure a loader. That's what the answers AI had given. Unfortunately, with Angular 17 onwards, they no longer use webpack but ESBuild; and worse, they hid the ESBuild configuration behind, so it's not easy, or even impossible, to modify. All in all, one refused to modify anything lest it break. We'll have to find alternative solution. 

As one'd mentioned earlier, since CDN can host the script and js online, why can't you host them locally yourself? That means writing a controller where the `<link>` tag (and the `<script>` tag, if applicable) calling your api locally, just like how you call other backend functions in your app. Instead of, say, forwarding a result from a database (the most common reason you need a backend call for), you're forwarding the css file to the frontend. Here's how you can do it: (Only for CSS. You need to modify if you want to forward js files)

```c#
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace YourNamespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class MathliveFontsController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        public MathliveFontsController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpGet("{filename}")]
        public async Task<IActionResult> GetFonts(string filename)
        {
            try {
              // Define the path to your CSS files
              string cssFilePath = Path.Combine(_environment.ContentRootPath, "Controllers", "mathlive", filename);

              // Check if the file exists
              if (!System.IO.File.Exists(cssFilePath))
              {
                  return NotFound($"File {filename} not found.");
              }

              // Read the CSS file content
              string cssContent = await System.IO.File.ReadAllTextAsync(cssFilePath);
              return Content(cssContent, "text/css");
            } catch (Exception ex) {
              return BadRequest($"Error loading CSS file: {ex.Message}");
            }
        }
    }
}
```

If you understand the code, you'd noticed one copied the mathlive folder into the same directory as my controller. So
```
mathlive/*
MathliveFontsController.cs
(other controller files)
```

Inside mathlive folder, One don't copy everything from my `node_modules/mathlive` to here. One only copied the necessary files, these are: 
- the entire `fonts` folder. (So there's no more `node_modules/mathlive/fonts` -- one'd deleted it). 
- `mathlive-fonts.css`, and 
- `mathlive-static.css`

That's not complete yet. We still need to fix the compilation in `node_modules/mathlive`. Now, the contents in `mathlive-fonts.css` and `mathlive-static.css` were referring to the `fonts` folder, but now they were gone, you get errors: 

```
X [ERROR] Could not resolve "fonts/KaTeX_Caligraphic-Regular.woff2"
```

Of course, it couldn't find the file where it originally locates. You **cannot** delete the 2 css files, because otherwise, `node_modules/mathlive/package.json` will start complaining. One don't want to modify anything in that file, so one decided to replace the 2 css files with dummy files. That is, open them up and delete all the contents. The files are there but without their content. This will solve the issue. 

Check that you successfully fetch the css intended by checking that your site runs correctly, or open F12 Debugging Console on your browser and check that it loads successfully. Though, one noticed in one's case, _even without the fonts, it renders successfully_. So perhaps one don't need the fonts after all. 