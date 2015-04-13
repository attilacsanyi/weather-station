describe('Weather Model', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation'));

    var weather, Weather;

    // Initialize test weather
    beforeEach(inject(function(_Weather_) {
        Weather = _Weather_;
        weather = new Weather('Clouds', 'few clouds', '02d');
    }));

    // Getters

    it('should contains name, description and icon properties', function(){
        expect(weather.getName()).toEqual('Clouds');
        expect(weather.getDescription()).toEqual('few clouds');
        expect(weather.getIcon()).toEqual('http://openweathermap.org/img/w/02d.png');
    });

    it('should contains avg/min/max temperature properties', function(){
        expect(weather.getTemp()).toEqual(0);
        expect(weather.getTempMin()).toEqual(0);
        expect(weather.getTempMax()).toEqual(0);
    });

    it('should contains pressure and humidity properties', function(){
        expect(weather.getPressure()).toEqual(0);
        expect(weather.getHumidity()).toEqual(0);
    });

    // Setters

    it('has "setPressure" api for setting pressure property', function(){
        var pressure = 10;
        weather.setPressure(pressure);

        expect(weather.getPressure()).toEqual(pressure);
    });

    it('has "setHumidity" api for setting humidity property', function(){
        var humidity = 13;
        weather.setHumidity(humidity);

        expect(weather.getHumidity()).toEqual(humidity);
    });

    // Methods

    it('has "setTemperatures" api for setting avg/min/max temperature properties', function(){
        expect(weather.setTemperatures).toBeDefined();
    });

    it('"setTemperatures" api should set avg/min/max temperature properties', function(){
        var temp = 28;
        var tempMin = 26;
        var tempMax = 30;
        weather.setTemperatures(temp, tempMin, tempMax);

        expect(weather.getTemp()).toEqual(temp);
        expect(weather.getTempMin()).toEqual(tempMin);
        expect(weather.getTempMax()).toEqual(tempMax);
    });
});