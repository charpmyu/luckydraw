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
    //console.log(namelist)
    $('#num_count').text("Remaining: " + namelist.length)

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
    if (namelist.length == 1){
        n = 0;
    }
    setTimeout(function () {
        popPushNItems($container, n);
        $container.css({ top: 0 });
    }, 300);
}

function randomSlotttIndex(max) {
    var randIndex = (Math.random() * max | 0);
    return (randIndex > 0) ? randIndex : randomSlotttIndex(max);
}

function drawanimate() {
    $("#winner-name").empty();
    buildSlotContents($namebox, namelist);
    buildSlotContents($namebox, namelist);
    buildSlotContents($namebox, namelist);

    let count = $("#winner-name").children().length;

    console.log(count);
    draw_area_bg.style.background = "url(./assets/draw_animation2.png)";
    draw_area_bg.style.backgroundRepeat = "no-repeat";
    draw_area_bg.style.backgroundSize = "cover";
    draw_area_bg.style.backgroundPosition = "center center";
    document.getElementById("win-effect").style.display = "none";

    const firstname = document.getElementById("winner-name");
    firstname.removeChild(firstname.firstElementChild);

    if (namelist.length == 0){
        return randomSlotttIndex(0);
    }
    var wordIndex = randomSlotttIndex(count);

    $namebox.animate({ top: -wordIndex * 150 }, 1500, 'swing', function () {
        rotateContents($namebox, wordIndex);
    });
}

$(function () {
    // const d = new Date();
    // let year = d.getFullYear();

    // $('#footer').text("Copyright@" + year)

    // $('#footer').append("<div>Copyright@"+ year +"</div>" );

    async function getFile(fileURL) {
        let fileContent = await fetch(fileURL);
        fileContent = await fileContent.text();
        return fileContent;
    }
    // Passing file url 
    getFile('alllist.txt').then(content => {
        // Using split method and passing "\n" as parameter for splitting
        namelist = content.trim().split("\n");

        $namebox = $('#namebox .slottt-machine-recipe__items_container');
        //buildSlotContents($namebox, namelist);
        const firstElement = namelist.shift();
    });


});