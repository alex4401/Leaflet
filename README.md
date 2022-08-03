# ARK Wiki's fork of Leaflet
This repository contains all custom patches and cherry-picks to Leaflet's source code, that are used in builds bundled with https://ark.wiki.gg's Data Maps extension.

## Patches
- window.devicePixelRatio used for canvas rendering
- PR#7926: Ensure map centre is maintained for zoom operations
- PR#7603: Update getCenter() calculation and move it to PolyUtil / LineUtil
- PR#8328: Fix wrong assigned parameter while calling map.\_move over requestAnimFrame
- Allow zoomAnimation only on touch & box zooms
- LayerGroup, FeatureGroup removed (for size reduction; the two can be replaced with simple arrays and loops)
- VML support removed (for size reduction)
- Internet Explorer support removed (for size reduction, and unsupported by ARK Wiki's CSS)
- CRSes other than Simple removed (for size reduction)
- All controls other than Zoom removed (for size reduction)
- GeoJSON removed (for size reduction, custom format is used)
- Tiles removed (for size reduction, custom format is used)

---

Leaflet was created 11 years ago by [Volodymyr Agafonkin](https://agafonkin.com), a Ukrainian citizen living in Kyiv.

Volodymyr is no longer in Kyiv, because Russian bombs are falling over the city. His family, his friends, his neighbours, thousands and thousands of absolutely wonderful people, are either seeking refuge or fighting for their lives.

The Russian soldiers have already killed tens of thousands of civilians, including women and children, and are committing mass war crimes like gang rapes, executions, looting, and targeted bombings of civilian shelters and places of cultural significance. The death toll keeps rising, and Ukraine needs your help.

As Volodymyr [expressed a few days ago](https://twitter.com/LeafletJS/status/1496051256409919489):

> If you want to help, educate yourself and others on the Russian threat, follow reputable journalists, demand severe Russian sanctions and Ukrainian support from your leaders, protest war, reach out to Ukrainian friends, donate to Ukrainian charities. Just don't be silent.

Ukrainians are recommending the [Come Back Alive](https://www.comebackalive.in.ua) charity. For other options, see [SupportUkraineNow.org](https://supportukrainenow.org).

If an appeal to humanity doesn't work for you, I'll appeal to your egoism: the future of Ukrainian citizens is the future of Leaflet.

It is chilling to see Leaflet being used for [documenting Russia's war crimes](https://ukraine.bellingcat.com/), [factual reporting of the war](https://liveuamap.com/) and for coordination of humanitarian efforts [in Romania](https://refugees.ro/) and [in Poland](https://dopomoha.pl/). We commend these uses of Leaflet.

If you support the actions of the Russian government (even after reading all this), do everyone else a favour and [carry some seeds in your pocket](https://www.theguardian.com/world/video/2022/feb/25/ukrainian-woman-sunflower-seeds-russian-soldiers-video).

Yours truly,<br>
Leaflet maintainers.

---

<img width="600" src="https://rawgit.com/Leaflet/Leaflet/main/src/images/logo.svg" alt="Leaflet" />

Leaflet is the leading open-source JavaScript library for **mobile-friendly interactive maps**.
Weighing just about 39 KB of gzipped JS plus 4 KB of gzipped CSS code, it has all the mapping [features][] most developers ever need.

Leaflet is designed with *simplicity*, *performance* and *usability* in mind.
It works efficiently across all major desktop and mobile platforms out of the box,
taking advantage of HTML5 and CSS3 on modern browsers while being accessible on older ones too.
It can be extended with a huge amount of [plugins][],
has a beautiful, easy to use and [well-documented][] API
and a simple, readable [source code][] that is a joy to [contribute][] to.

For more info, docs and tutorials, check out the [official website][].<br>
For **Leaflet downloads** (including the built main version), check out the [download page][].

We're happy to meet new contributors.
If you want to **get involved** with Leaflet development, check out the [contribution guide][contribute].
Let's make the best mapping library that will ever exist,
and push the limits of what's possible with online maps!

[![CI](https://github.com/Leaflet/Leaflet/actions/workflows/main.yml/badge.svg)](https://github.com/Leaflet/Leaflet/actions/workflows/main.yml)

 [contributors]: https://github.com/Leaflet/Leaflet/graphs/contributors
 [features]: http://leafletjs.com/#features
 [plugins]: http://leafletjs.com/plugins.html
 [well-documented]: http://leafletjs.com/reference.html "Leaflet API reference"
 [source code]: https://github.com/Leaflet/Leaflet "Leaflet GitHub repository"
 [hosted on GitHub]: http://github.com/Leaflet/Leaflet
 [contribute]: https://github.com/Leaflet/Leaflet/blob/main/CONTRIBUTING.md "A guide to contributing to Leaflet"
 [official website]: http://leafletjs.com
 [download page]: http://leafletjs.com/download.html

