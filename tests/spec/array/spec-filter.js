define(['amd-utils/array/filter'], function (filter) {

    describe('array/filter()', function(){

        it('should filter items', function(){
            var items = [1,2,3,4,5];
            var result = filter(items, function(val, i, arr){
                return (val % 2) !== 0;
            });

            expect( items.length ).toEqual( 5 ); //make sure it doesn't replace original array
            expect( result ).toEqual( [1, 3, 5] );
        });

        it('should loop all array items, even if sparse. see #64', function () {
            var items = new Array(6);
            items[2] = 3;
            items[5] = 8;
            var count = 0;

            var result = filter(items, function(val, i, arr){
                expect( arr ).toBe( items );
                expect( val ).toBe( items[i] );
                count += 1;
                return val % 2 === 0;
            });

            expect( result ).toEqual( [8] );
            // IMPORTANT
            // ---------
            // this behavior is different than ES5 Array#filter
            expect( count ).toEqual( 6 );
        });

        it('should return empty array if no items match', function () {
            var items = [1,2,3,4,5];
            var result = filter(items, function(val, i, arr){
                return false;
            });

            expect( result ).toEqual( [] );
        });

        it('should return empty array if target is null/undefined', function () {
            expect( filter() ).toEqual( [] );
            expect( filter(null) ).toEqual( [] );
        });

    });

});
