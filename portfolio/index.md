---
pagetitle: Portfolio
description: Garrett Hale's Fancy Portfolio
author: Garrett Hale
css: portfolio.css
---


# Vessels

Made in Unreal 4, [Steam](https://store.steampowered.com/app/1371330/Vessels/)

- Won IGF 2021 Best Student Game
- Dialogue engine handles 16,000 lines

::: slides
![](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1371330/ss_4304b60764ce7b307b26d90d6ef13104365f5569.jpg?t=1643131691 "Vessels dialogue gameplay")
![](content/vessels_trees/ch2/Intercom.adf.png "Vessels dialogue tree visualizer")
![](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1371330/ss_1d4df773f4c28d1f75344ca67c6a828fad1ed6de.jpg?t=1643131691 "Vessels walking gameplay")
:::

---

# Game Jams

Various teams with various engines, [Itch.io](https://gertkeno.itch.io/)

::: slides
![](content/bubble_ranch_editor.png "Bubble Ranch in-editor screenshot")
![](https://img.itch.zone/aW1hZ2UvMzAwNjY2Ny8xNzk4MTEyMS5qcGVn/original/p1hX1a.jpeg "Twin Blade Tango gameplay")
![](https://img.itch.zone/aW1nLzEzNTEzMDMwLmpwZWc=/original/%2FJkGGv.jpeg "Bun Bun Fun Run gameplay ui removed")
:::

---

# RIFT

Making new features in an old codebase, [Steam](https://store.steampowered.com/app/39120/RIFT/)

- Gameplay and UI

::: slides
![](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/39120/ss_986c7d5cce68e24aa174c2b8aa25ce1801256f1e.jpg?t=1700242293 "RIFT Character")
![](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/39120/ss_d959a7b220d64bed9f0d732b7b026662f735dabe.jpg?t=1700242293 "RIFT opening in game")
:::

---

# Flappatron

- [Steam](https://store.steampowered.com/app/1009750/Flappatron/)
- Automatic and Manual Lip syncing tools

::: slides
![](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1009750/ss_3e1be264f6cab8f5abba4266a26d58f38767691e.jpg?t=1719566226 "Flappatron gameplay 1st slide")
![](content/flappa_sync_view.png "Flappatron lipsync tool")
![](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1009750/ss_36e6710490b1937c20a073fcdc2819084095acbd.jpg?t=1719566226 "Flappatron gameplay 2nd slide")
:::

---

# MyCodingPlace

- [Website](https://www.mycodingplace.com/)
- Setup VPN and file server
- Teaching game programming

<script>
function increment_slide(container) {
    const slides = container.querySelectorAll("img");
    let next_value = false;
    for (let i = 0; i < slides.length; i++){
        const is_shown = slides[i].style.display != "none";
        slides[i].style.display = next_value || is_shown ? "inherit" : "none";

        if (is_shown) {
            slides[i].style.animation = "slide_out 0.25s ease-out";
            slides[i].style.zIndex = 100;
            slides[i].onanimationend = () => {
                // if interrupted the next no slide is left visible.
                slides[i].style.display = "none";
                slides[i].style.zIndex = 10;
                slides[i].style.animation = "";
            }, {once : true};
        }

        if (next_value) {
            return;
        }

        next_value = is_shown
    }

    slides[0].style.display = "inherit"
}

const containers = document.querySelectorAll(".slides");
for (let i = 0; i < containers.length; i++) {
    const slides = containers[i].querySelectorAll("img");

    containers[i].addEventListener('click', function(e) {
        increment_slide(containers[i]);
    });

    for (let j = 0; j < slides.length; j++) {
        slides[j].style.display = j == 0 ? "inner-div" : "none";
    }

    setTimeout(() => {
        setInterval(increment_slide, 5000, containers[i]);
    }, i * 2000);
}
</script>
