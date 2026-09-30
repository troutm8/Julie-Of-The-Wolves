# Julie of the Wolves: Web Comic Plan

This is a personal, family-only web comic adaptation of Jean Craighead George's
*Julie of the Wolves* (1972). It covers the whole book, is read page by page in
panels, and uses stylized illustrations generated in code.

---

## 1. Goals

- Tell the **whole story** in all three of the book's parts, in comic form.
- Keep it **easy to read together**: one page at a time with big panels, clear
  lettering and simple navigation. It should work on a tablet, a phone or a laptop.
- Give the art **one consistent look**, so Miyax, the wolves and the tundra look
  the same from the first page to the last.
- Make it **private**. It isn't published to the public web.

## 2. Art approach: stylized illustrations built in code

This environment has no image-generation model. Instead, the art is drawn as
**SVG illustrations built from a reusable art kit**. That approach gives us:

- **Consistency.** Every character is one component with poses and expressions,
  so Miyax always looks like Miyax.
- **Scale.** The book needs about 450–550 panels. Assembling scenes from parts
  (background + characters + props + lighting) makes that practical.
- **A crisp look at any screen size, from a small set of files.**

**Style:** flat, layered shapes with limited palettes and soft gradients, similar
to a painted picture book or a paper-cut look. The tundra is shown through
layered horizons, sky color and light rather than fine detail.

**Palettes that set the mood:**

| Setting | Palette |
|---|---|
| Summer tundra (Part I) | Gold grass, pale blue sky, low sun that never sets |
| Seal camp and Nunivak memories (Part II) | Warm driftwood browns, sea grays, lamplight amber |
| Barrow (Part II) | Cold, washed-out grays and blues, harsh electric light |
| Autumn and winter tundra (Part III) | Violet twilight, deep blue snow, aurora greens |

**Art kit contents:**

- **Characters:**
  - **Miyax:** parka with a wolverine ruff, mukluks, ulu, and a pack. She has
    about 10 poses (stand, walk, crouch, crawl, lie, sit, reach, run, hold pup,
    carry) and about 8 expressions.
  - **Wolves**, each with their own coloring and markings: Amaroq (large, silver
    and black), Silver, Kapu (young, dark with a pale face), Nails, Jello (thin,
    hunched), and the pups Sister, Zing and Zat. Poses include stand, lie, trot,
    run, play-bow, pin-ears and howl.
  - **Supporting cast:** Kapugen (young and later older), Aunt Martha, Amy (seen
    in photos and letters), Daniel, Nusan, Pearl, Naka, and Tornait the golden
    plover.
  - **Animals:** caribou, lemmings, birds and a sled dog.
- **Backgrounds:** open tundra, the frost-heave hill and the wolf den, Miyax's
  sod house, a river bank, seal camp on the shore, the Mekoryuk village, Barrow
  streets and a house interior, Kangik, and a winter ice house.
- **Props and effects:** the plane, a rifle, a sled, an oil lamp, letters and
  photos, falling snow, aurora, blowing wind, and a "memory" filter for
  flashbacks.
- **Lettering:** captions (narration), speech balloons, thought balloons, and
  **wolf body-language cues** shown as small icons, because the wolves "talk"
  through posture.

**Option:** every panel can take a drop-in image. If we later want painted art
from an outside image tool, I can write a prompt for each panel and the reader
will use the image in place of the SVG. Nothing else would need to change.

## 3. Reader (the website)

- A **plain static site with no build step**: HTML, CSS and JavaScript. It opens
  directly from a file or from a private link.
- **Page-by-page reading:**
  - Arrow buttons, keyboard arrows and swipe on touch screens.
  - A two-page spread on wide screens and a single page on phones.
  - Pages are laid out on a grid of 3–6 panels with varied sizes, including
    full-page "splash" panels for big moments.
- **Chapter menu** with a cover image for each chapter.
- **Remembers your place** (saved per browser), so you can stop at bedtime and
  pick up the next night.
- **Glossary** of Yupik words used in the story (Amaroq, Kapugen, gussak, ulu,
  qiviu, and so on), shown as tap-to-see notes in the panels plus a glossary
  page.
- **Private viewing:** published as a private claude.ai artifact that only you
  can open unless you share it, with a copy kept in this repo.

**How the story is stored:** each chapter is a script file (JSON). The reader
turns scripts into pages:

```
chapter → pages → panels
panel = { size, background, time/light, characters: [{who, pose, expression, x, y, facing}],
          props, caption, balloons: [{who, text, kind}], wolfCue }
```

Keeping the story as data means editing a line of dialogue or re-staging a
panel doesn't require touching any art code.

## 4. Adaptation: chapter breakdown

The book has three parts. I'll split them into **12 chapters of about 8–10 pages
each**, roughly **110 pages** in total. This outline is from memory of the book.
I'll check event order and details when I script each chapter.

### Part I: Amaroq, the Wolf

1. **Lost:** Miyax is alone on the endless summer tundra with no food. She
   remembers her father saying that wolves will help you. She watches the pack
   from her camp.
2. **Wolf talk:** Miyax studies the wolves' signals (ears, tails, eyes) and
   tries them herself. Kapu plays with her. She fails, then Amaroq finally
   touches her head and accepts her.
3. **Food from the pack:** She begs like a pup and is fed. She names the wolves
   and gets to know each personality, including Jello, the outcast. She builds
   her sod house and snares lemmings.
4. **The caribou hunt:** The pack hunts. Miyax gathers meat and prepares for the
   journey. The sun begins to set for the first time. She thinks of home, which
   leads into the flashback.

### Part II: Miyax, the Girl (flashback)

5. **Seal camp:** Her early childhood with Kapugen on the Bering Sea coast. They
   hunt seal, do the bird dance and tell stories, including the wolf that saved
   Kapugen in the starving time.
6. **Mekoryuk:** Aunt Martha takes Miyax to live in the village. School gives
   her a new name, Julie. Word comes that Kapugen was lost at sea. Letters and
   photos from her pen pal Amy in San Francisco begin to arrive.
7. **Barrow:** At 13 she marries Daniel under an old arrangement. She lives with
   Nusan, sews with Pearl, and feels lonely. Daniel frightens her. She decides
   to run away toward Point Hope and a ship to Amy.

### Part III: Kapugen, the Hunter

8. **Traveling with the pack:** The wolves move and she follows. She finds
   Tornait, the golden plover.
9. **Jello:** Jello raids her camp and steals her pack. The pack deals with him.
   She rebuilds her gear.
10. **The plane:** Hunters in a plane shoot Amaroq and wound Kapu. Miyax nurses
    Kapu back to health, and Kapu becomes the leader.
11. **Winter journey:** The pack leaves. Miyax builds a winter house, survives a
    storm and learns more of the old ways. She meets a family who tells her
    Kapugen is alive in Kangik.
12. **Kapugen:** She finds her father. He is changed: a new wife, a plane,
    modern ways. Tornait dies. She sings to the spirit of Amaroq, then points her
    boots toward Kapugen.

**Handling sensitive content** (to be confirmed with you):

- **Daniel's attack (Chapter 7).** It is shown only by suggestion: he grabs her
  arm, the panel cuts to black, then she is running. Nothing more is depicted.
- **Amaroq's death (Chapter 10).** It is shown at a distance and in silhouette,
  followed by a quiet splash panel. There is no gore.
- **Hunting (seal, caribou, lemmings).** It happens off panel or is shown by
  what's left after, the way the book treats it.

**Cultural care:**

- Miyax is a **Yup'ik** girl from Nunivak Island. Barrow is an **Iñupiat**
  town.
- The book, written in 1972, uses the word "Eskimo." Narration will use
  **"Yup'ik" / "Iñupiat"**, while characters speak the way the story calls for.
- Clothing, tools and homes will be researched and drawn with care: fur-ruffed
  parkas, mukluks, the ulu, the qulliq lamp, and sod houses.

**Dialogue:** it is adapted in my own words to fit balloons, not copied from the
book. For a private family copy we could quote favorite lines. Just tell me
which ones.

## 5. Milestones

Each milestone is committed to this repo and published to the private link so
you can read it and send feedback.

| # | Milestone | What you get |
|---|---|---|
| **M1** | **Reader + art kit + pilot** | The working reader, Miyax, Amaroq, Kapu, the tundra backgrounds, and **Chapter 1 complete**. *Pause here for your feedback on the look.* |
| M2 | Part I | Chapters 2–4 and the rest of the wolf pack |
| M3 | Part II | Chapters 5–7, the flashback palette, and the village and Barrow sets |
| M4 | Part III | Chapters 8–12, winter sets, the plane, and Tornait |
| M5 | Polish | Covers, title page, glossary, "about the book" page, pacing edits, read-through fixes |

The pilot matters most. Once the art kit and the look are settled, the remaining
chapters mostly reuse it.

## 6. Repo layout (planned)

```
index.html            reader shell
css/reader.css        layout, panels, lettering
js/reader.js          navigation, page layout, bookmarks
js/render.js          turns a panel script into SVG
art/characters/*.js   Miyax, wolves, people, animals (pose + expression)
art/scenes/*.js       backgrounds by location and light
art/props/*.js        props and effects
story/chNN.json       chapter scripts
story/glossary.json   Yupik words
PLAN.md               this file
```

## 7. Open questions

1. **Your daughter's age.** This decides how much of Chapter 7 and Chapter 10 to
   show (see "Handling sensitive content").
2. **Do you have a copy of the book?** I'm working from memory. Any details you
   want kept exactly (favorite moments or lines) are welcome.
3. **Style.** Is the stylized paper-cut / picture-book look right, or would you
   prefer something more like a classic comic with bold outlines?
