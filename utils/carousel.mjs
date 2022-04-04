import prompts from "prompts";
import { fold } from "./fold.mjs";
import fs from 'fs'

export default async function makeCarousel() {
    !(async () => {
        const rCoverOrBody = await prompts({
          type: "select",
          name: "value",
          message: "Would you like to make a cover or body of carousel?",
          hint: "Use as setas para mover ou [J/K].",
          choices: [
            { title: "Cover", value: "cover" },
            { title: "Body", value: "body" },
          ],
          initial: 0,
        });
        
        if (rCoverOrBody.value == "cover") {
          
          const questionsCover = [
            {
              type: "text",
              name: "title",
              message: "What's the title of the cover?"
            },
            {
              type: "text",
              name: "subtitle",
              message: "what's the subtitle of the cover?"
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
            const response = await prompts(questionsCover);
            const responseTitle = response.title
            const responseSubtitle = response.subtitle

            const titleTextArray = fold(responseTitle, 16, true);
            const titleLineBracketText = titleTextArray
              .map((line) => line.trim())
              .join("\n");
          
            const subTitleTextArray = fold(responseSubtitle, 25, true);
            const subTitleLineBracketText = subTitleTextArray
              .map((line) => line.trim())
              .join("\n");

            fs.writeFileSync("./tmp/titletext.txt", titleLineBracketText);
            fs.writeFileSync("./tmp/subtitletext.txt", subTitleLineBracketText);

            var overlayCover = ""

            if(response.style == 1) {
              overlayCover = "./assets/overlays/carousel-overs/01-A.png"

            } 
            if(response.style == 2) {
              overlayCover = "./assets/overlays/carousel-overs/02-A.png"
            } 
            if(response.style == 3) {
              overlayCover = "./assets/overlays/carousel-overs/03-A.png"
            }

            const outputCover = "./outputs/carousel/output-cover.png"
            const overlayText = "./tmp/output-cover-text.png"
            
            const antonFont = "./assets/fonts/Anton-Regular.ttf"
            const robotoFont = "./assets/fonts/Roboto-Regular.ttf"

            const spacingSizesLines = {
              1: "-30",
              2: "30",
              3: "180",
            };
          
            const spacingSizesTitle = {
              1: "-160",
              2: "-150",
              3: "-100",
            };
          
            const spacingSizesByAmountOfTitle =
              spacingSizesTitle[Math.min(titleTextArray.length, 3)];
            const spacingSizesByAmountOfLines =
              spacingSizesLines[Math.min(titleTextArray.length, 3)];

            await $`convert -size 930x930 canvas:none -gravity west \
            -font ${antonFont} -fill #efd607  -pointsize 110 -interline-spacing -25 -annotate +0${spacingSizesByAmountOfTitle} @tmp/titletext.txt \
            -font ${robotoFont} -fill white  -weight ExtraBold  -pointsize 50 -interline-spacing 0 -annotate +0+${spacingSizesByAmountOfLines} @tmp/subtitletext.txt \
            ${overlayText}`
              
            await $`magick composite -gravity center -size 1080x1080 ${overlayText} ${overlayCover}  ${outputCover} `;
          })();
          
        } if (rCoverOrBody.value == "body") {
         
          const questionsCover = [
            {
              type: "text",
              name: "title",
              message: "What's the title of the body?"
            },
            {
              type: "text",
              name: "subtitle",
              message: "What's the subtitle of the body?"
            },
            {
              type: "text",
              name: "page",
              message: "What's the number of the page?"
            },
            {
              type: 'select',
              name: 'style',
              message: `This page's body have a style? if yes choose one.`,
              choices: [
                { title: 'No', value: 0 },
                { title: 'Style 1', value: 1 },
                { title: 'Style 2', value: 2 },
                { title: 'Style 3', value: 3 }
              ],
              initial: 1
            }
          ]

          !(async () => {
            const response = await prompts(questionsCover);
            const responseTitle = response.title
            const responseSubtitle = response.subtitle
            const numberPage = response.page

            const titleTextArray = fold(responseTitle, 26, true);
            const titleLineBracketText = titleTextArray
              .map((line) => line.trim())
              .join("\n");
          
            const subTitleTextArray = fold(responseSubtitle, 35, true);
            const subTitleLineBracketText = subTitleTextArray
              .map((line) => line.trim())
              .join("\n");

            fs.writeFileSync("./tmp/titletext.txt", titleLineBracketText);
            fs.writeFileSync("./tmp/subtitletext.txt", subTitleLineBracketText);

            var overlayCover = ""

            console.log(response.style)

            if (response.style == 0 ) {
              overlayCover = "./assets/overlays/carousel-overs/body.png"
            }
            if (response.style == 1 ) {
              overlayCover = "./assets/overlays/carousel-overs/01-B.png"
            }
            if (response.style == 2 ) {
              overlayCover = "./assets/overlays/carousel-overs/02-B.png"
            }
            if(response.style == 3 ) {
              overlayCover = "./assets/overlays/carousel-overs/03-B.png"
            }
            console.log(response.style)
            
            const outputBody = `./outputs/carousel/${numberPage}-output-body.png`
            const overlayText = "./tmp/output-cover-text.png"

            const antonFont = "./assets/fonts/Anton-Regular.ttf"
            const robotoFont = "./assets/fonts/Roboto-Regular.ttf"

            

            const spacingSizesLines = {
              1: "30",
              2: "30",
            };
          
            const spacingSizesTitle = {
              1: "-260",
              2: "-260",
            };
          
            const spacingSizesByAmountOfTitle =
              spacingSizesTitle[Math.min(titleTextArray.length, 2)];
            const spacingSizesByAmountOfLines =
              spacingSizesLines[Math.min(titleTextArray.length, 2)];

            await $`convert -size 930x930 canvas:none -gravity center \
            -font ${antonFont} -fill #efd607  -pointsize 80 -interline-spacing 0 -annotate +0${spacingSizesByAmountOfTitle} @tmp/titletext.txt \
            -font ${robotoFont} -fill white  -weight ExtraBold  -pointsize 40 -interline-spacing 0 -annotate +0+${spacingSizesByAmountOfLines} @tmp/subtitletext.txt \
            ${overlayText}`
              
            await $`magick composite -gravity center -size 1080x1080 ${overlayText} ${overlayCover} ${outputBody} `;



          })();
          
        }
      
      })()
}
