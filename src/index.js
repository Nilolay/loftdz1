var NewModule = {
    report: document.getElementById('report'),
    head1: document.getElementById('head1'),
    reportlist: document.getElementById('report-list'),
    name: document.getElementById('name'),
    place: document.getElementById('place'),
    additional: document.getElementById('additional'),
    save: document.getElementById('save'),
    close: document.getElementById('close'),
    link: document.getElementsByClassName('ballon_body')[0],
    reports: [],
    geos: [],
    loc: '',
    coords: [],
    in: function() {
        ymaps.ready(init);

    function init () {
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], 
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        NewModule.coords = e.get('coords');
        console.log(NewModule.coords);  
        getAddress(NewModule.coords).then(function (res) {
        NewModule.report.style.display = 'block';
        NewModule.head1.textContent = NewModule.loc;
        NewModule.getList();
        })
    });

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
         return ymaps.geocode(NewModule.coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            console.log(firstGeoObject);  
            NewModule.loc = firstGeoObject.properties._data.text;
        });

    }
    NewModule.close.addEventListener('click', function(){
        NewModule.report.style.display = 'none';
    })
    NewModule.save.addEventListener('click', function(){
        if (NewModule.name.value && NewModule.place.value && NewModule.additional.value) {
            var b = {};
            b.cor = NewModule.coords;
            b.pla = NewModule.loc;
            b.name = NewModule.name.value;
            b.place = NewModule.place.value;
            b.opinion = NewModule.additional.value;
            console.log(b);
            NewModule.reports.push(b);
            NewModule.getList(NewModule.loc);
            var myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: NewModule.coords
            },
            // Свойства.
            properties: {
                // Контент метки.
                balloonContentHeader: NewModule.place.value,
                balloonContentBody: NewModule.loc,
                balloonContentFooter: NewModule.additional.value,
                hintContent: NewModule.loc
            }
            }, {
                preset: 'islands#dotIcon',
                iconColor: '#735184'
            });
            myGeoObject.events.add('click', function(e) {
                NewModule.report.style.display = 'block';
                console.log(e);
                NewModule.head1.textContent = e.originalEvent.target._geoObjectComponent._properties._data.hintContent;
                NewModule.loc = e.originalEvent.target._geoObjectComponent._properties._data.hintContent;
                NewModule.coords = e.originalEvent.target._geoObjectComponent._geometry._coordinates;
                NewModule.getList(NewModule.loc);
                console.log(e);
                console.log(b);
            });
            NewModule.geos.push(myGeoObject);
            clusterer.add(NewModule.geos);
//            myMap.geoObjects.add(myGeoObject);
//            console.log(myMap.geoObjects);
            
            }
            })
            var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
            '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
            );
            var clusterer = new ymaps.Clusterer({
            /**
             * Через кластеризатор можно указать только стили кластеров,
             * стили для меток нужно назначать каждой метке отдельно.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
             */
            preset: 'islands#invertedVioletClusterIcons',
            /**
             * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
             */
            groupByCoordinates: false,
            /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
            gridSize: 80,
            clusterDisableClickZoom: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
            clusterBalloonPagerSize: 5,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
            });
            clusterer.add(NewModule.geos);
            myMap.geoObjects.add(clusterer);
            myMap.setBounds(clusterer.getBounds(), {
                checkZoomRange: true
            });
            }
            },
    getList: function(ad) {
            NewModule.reportlist.innerHTML = '';
            for (var i = 0; i < NewModule.reports.length; i++) {
            if (ad == NewModule.reports[i].pla ) {
            var El = document.createElement('li');
            El.innerHTML = '<span><b>' + NewModule.reports[i].name + '</b>   ' +  NewModule.reports[i].place + '</span>' + '<p>' + NewModule.reports[i].opinion + '</p>' ;
            NewModule.reportlist.appendChild(El);
            }
            }
    }
    }
window.onload = NewModule.in();
window.NewModule = NewModule;