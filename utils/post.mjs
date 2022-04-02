import prompts from "prompts";
import fs from "fs"
import { fold } from "./fold.mjs";

export async function makeRegularPost() {
  const questionsRegularPost = [
    {
      type: "text",
      name: "title",
      message: "What's the text of the post?"
    },
    {
      type: 'select',
      name: 'style',
      message: "What's the style of the cover",
      choices: [
        { title: 'Style 1', value: 1 },
        { title: 'Style 2', value: 2 },
        { title: 'Style 3', value: 3 }
      ],
      initial: 1
    }
  ]


      !(async () => {
        const response = await prompts(questionsRegularPost);
        const responseTitle = String(response.title)

        const titleTextArray = fold(responseTitle, 32, true);
        const titleLineBracketText = titleTextArray
          .map((line) => line.trim())
          .join("\n");

        fs.writeFileSync("./tmp/titletext.txt", titleLineBracketText);

        var overlayCover = ""
        if(response.style == 1) {
          overlayCover = './assets/overlays/regular-post/01.png'

        } 
        if(response.style == 2) {
          overlayCover = './assets/overlays/regular-post/02.png'
        } 
        if(response.style == 3) {
          overlayCover = './assets/overlays/regular-post/03.png'
        }

        const outputCover = `./outputs/post/1output-post.png`
        const overlayText = "./tmp/output-cover-text.png"
              
        const robotoFont = "./assets/fonts/Roboto-Bold.ttf"

        await $`convert -size 720x335 canvas:none  \
        -font ${robotoFont} -fill white -gravity center -pointsize 45 -interline-spacing 0 -annotate +0-40 @tmp/titletext.txt ${overlayText}`
          
        await $`magick composite -gravity center -size 1080x1080 ${overlayText} ${overlayCover}  ${outputCover} `;
        
      })();

}