const draw_area_bg = document.getElementById("draw-area-bg");

var namelist = []

function buildSlotItem(text) {
    return $('<div>').addClass('slottt-machine-recipe__item')
        .text(text)
}

function buildSlotContents($container, namelist) {
    $items = namelist.map(buildSlotItem);
    $container.append($items);
}

function popPushNItems($container, n) {
    let current_name;
    $children = $container.find('.slottt-machine-recipe__item');
    $children.slice(0, n).insertAfter($children.last());

    if (n === $children.length) {
        popPushNItems($container, 1);
    }
    let doc = document.getElementById("winner-name");
    current_name = doc.getElementsByTagName("div")[0].innerHTML;
    var index = namelist.indexOf(current_name);    // <-- Not supported in <IE9
    if (index !== -1) {
        namelist.splice(index, 1);
    }
    console.log(namelist)

    document.getElementById("win-effect").style.display = "block";
    draw_area_bg.style.background = "url(./assets/draw_animation1.png)";
    draw_area_bg.style.backgroundRepeat = "no-repeat";
    draw_area_bg.style.backgroundSize = "cover";
    draw_area_bg.style.backgroundPosition = "center center";
}

// After the slide animation is complete, we want to pop some items off
// the front of the container and push them onto the end. This is
// so the animation can slide upward infinitely without adding
// inifinte div elements inside the container.
function rotateContents($container, n) {
    setTimeout(function () {
        popPushNItems($container, n);
        $container.css({ top: 0 });
    }, 300);
}

function randomSlotttIndex(max) {
    var randIndex = (Math.random() * max | 0);
    return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
}

function drawanimate() {
    draw_area_bg.style.background = "url(./assets/draw_animation2.png)";
    draw_area_bg.style.backgroundRepeat = "no-repeat";
    draw_area_bg.style.backgroundSize = "cover";
    draw_area_bg.style.backgroundPosition = "center center";
    document.getElementById("win-effect").style.display = "none";
    var wordIndex = randomSlotttIndex(namelist.length);
    $namebox.animate({ top: -wordIndex * 150 }, 2000, 'swing', function () {
        rotateContents($namebox, wordIndex);
    });
}

$(function () {
    const d = new Date();
    let year = d.getFullYear();

    async function getFile(fileURL) {
        let fileContent = await fetch(fileURL);
        fileContent = await fileContent.text();
        return fileContent;
    }
    // Passing file url 
    getFile('file.txt').then(content => {
        // Using split method and passing "\n" as parameter for splitting
        namelist = content.trim().split("\n");

        $('#footer').text("Copyright@" + year)
        $namebox = $('#namebox .slottt-machine-recipe__items_container');
        buildSlotContents($namebox, namelist);

    });


});