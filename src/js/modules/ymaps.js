const MARKERS = [
    {
        className: "marker-class",
        yProps: {
            coordinates: [32.811200, 35.166254].reverse(),
            draggable: false
        },
        content: {
            tile: "",
            description: ""
        }
    },
    {
        className: "marker-class",
        yProps: {
            coordinates: [45.768441, 57.852036],
            draggable: false
        },
        content: {
            tile: "",
            description: ""
        },
    },
    {
        className: "marker-class-fc",
        yProps: {
            coordinates: [45.762375, 57.852132],
            draggable: false
        },
        content: {
            tile: "",
            description: ""
        }
    }
]

export async function initMap() {
    await ymaps3.ready.then(() => {
        const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;
        // Инициализация карты
        const map = new YMap(
            document.getElementById('map'),
            {
                location: {
                    center: [45.764796, 57.851252],
                    zoom: 14
                },
                behaviors: ['drag'],
            }
        );
        customizateYmap("asdasd")

        function newMarker(props, className) {
            const marker = document.createElement("div")
            marker.className = className ? `${className}` : 'marker-class';
            marker.innerHTML = `<div class=${marker.className}__content>
                                ${props.content.title ? "<p class='marker-title'>" + props.content.title + "</p>" : ""}
                                ${props.content.description ? "<p class='marker-description'>" + props.content.description + "</p>" : ""}
                                </div>`

            return new YMapMarker(props.yProps, marker)
        }

        map.addChild(new YMapDefaultSchemeLayer())
        // создание слоя с маркерами
        map.addChild(new YMapDefaultFeaturesLayer({ id: 'features', zIndex: 1800 }));
        MARKERS.forEach(markerprops => {
            map.addChild(newMarker(markerprops, markerprops.className))
        })
        customizateYmap("asdasd")
    }
    )
}

export function customizateYmap(colorOptions) {
    let canvas = document.querySelector("#map > ymaps > ymaps > ymaps.ymaps3x0--main-engine-container > canvas")
    console.log(canvas);
    let context = canvas.getContext("2d")
    console.log(context);

}



