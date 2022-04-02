import prompts from "prompts";
import { makeRegularPost } from "./utils/post.mjs";
import makeCarousel from "./utils/carousel.mjs"

!(async () => {
  const fristQuestion = await prompts({
    type: "select",
    name: "value",
    message: "Would you like to make a Regular post or Carousel?",
    hint: "Use as setas para mover ou [J/K].",
    choices: [
      { title: "Regular post", value: "regularpost" },
      { title: "Carousel", value: "carousel" }
    ],
    initial: 0,
  });
  
  if (fristQuestion.value == "regularpost") {
    makeRegularPost()
  } if (fristQuestion.value == "carousel") {
    makeCarousel()
  }
  
})()