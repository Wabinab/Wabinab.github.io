# Learning

## How to Serve locally: 

No auto-reload: 
```bash
npx http-server -p 8080 -c-1 .
```

Have auto-reload: 
```bash
live-server .
```

Make sure to install `http-server` and/or `live-server` beforehand at global (`-g`) level. 

## Printing
If you encounter any txt file online, you can create a temporary file under `article`, then generate the webpage for printing. However, the css for printing isn't the best here, because it's optimized for large text size, not minimal no. of pages; therefore, use [PrintFriendly](https://chromewebstore.google.com/detail/printfriendly-print-and-p/ohlencieiipommannpdfcmfdpjjmeolj), also removed the "Read Next" section scrolling down to the end (again, CSS forget to remove this from `@media print`), then print. It's good enough for compact size while using most space, not being too small, esp. if there are lots of texts. 