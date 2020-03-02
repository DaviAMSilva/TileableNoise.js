/**
 * Classe para guardar as funções de ruído
 *
 * @class TileableNoise
 * @property `seed` Valor que determina o ruído gerado
 * @method `eval1D` Ruído repetível para 1D
 * @method `eval2D` Ruído repetível para 2D
 */
class TileableNoise {



    /**
     * Instanciação da classe para guardar as funções de ruído
     * @param {Number} r 
     * @param {Number} fromX 
     * @param {Number} toX 
     * @param {Number} [fromY] 
     * @param {Number} [toY] 
     * @returns {TileableNoise} Instância da classe
     */
    constructor(r, fromX, toX, fromY, toY) {


        // The range of the function
        this.fromX = fromX;
        this.toX = toX;

        // Sets the initial seed
        this.seed = Math.round(Math.random() * 1000);

        // Stores the noise function
        this.simplexNoise = new SimplexNoise(this.seed);

        if (arguments.length === 3) {

            // If fromY and toY are not passed in they get assigned the same as fromX and toX, respectevely...
            this.fromY = fromX;
            this.toY = toX;

            // r is the radius of the first circle from where the noise is taken. It represents the noise scale of the x axis.
            this.r1 = r;

            // Here r2 is equal to r because the x axis is "equal" to the y axis
            this.r2 = r;

        } else if (arguments.length === 5) {

            // ... else It's assigned as normal
            this.fromY = fromY;
            this.toY = toY;

            // r is the radius of the first circle from where the noise is taken. It represents the noise scale of the x axis.
            this.r1 = r;

            // r2 is the radius of the second circle . It represents the noise scale of the y axis.
            // It scales acording to the ratio of the absolute values of the difference in to'A' and from'A'.
            // This is necessary because sometimes the scales of the x and y axis are different
            this.r2 = r * Math.abs(toY - fromY) / Math.abs(toX - fromX);

        } else {

            // If arguments are passed in incorrectly the code simply won't run
            throw new Error("An invalid number of arguments was passed in (" + arguments.length + ", instead of 3 or 5)");

        }


    }



    /**
     * Evaluates the noise at values (x, t) onde x repete e t não
     * @param {Number} x Valor para calcular o ruído
     * @param {Number} [t=0] The input t can be used to make animations. If undefined, t is set to 0.
     * @returns {Number} Ruído
     */
    eval1D(x, t = 0) {


        // Calculates the angle according to the x value. If x=fromX -> angle=0; If x=toX -> angle=2 * Math.PI. Thus the position loops
        var angle = (x - this.fromX) / (this.toX - this.fromX) * 2 * Math.PI;

        // Calculates the position based on the angle and offsets the circle, so it's positive in its entirety
        var X = this.r1 * Math.cos(angle);
        var Y = this.r1 * Math.sin(angle);

        // Returns the noise of X, Y and t, but converts from range [-1, 1] to [0, 1]
        return (this.simplexNoise.noise3D(X, Y, t) + 1) / 2;


    }



    /**
     * Evaluates the noise at values (x, y)
     * @param {Number} x Valor para calcular o ruído
     * @param {Number} y Valor para calcular o ruído
     * @param {Number} [t=0] The input t can be used to make animations. If undefined, t is set to 0.
     * @returns {Number} Ruído
     */
    eval2D(x, y, t = 0) {


        // Calculates the angle1 according to the x value. If x=fromX => angle1=0; If x=toX => angle1=2 * Math.PI. Thus the position loops on the x axis
        // Calculates the angle2 according to the y value. If y=fromY => angle2=0; If y=toY => angle2=2 * Math.PI. Thus the position loops on the y axis
        var angle1 = (x - this.fromX) / (this.toX - this.fromX) * 2 * Math.PI;
        var angle2 = (y - this.fromY) / (this.toY - this.fromY) * 2 * Math.PI;

        // Calculates the 4D position based on the angle and offsets the circle, so it's positive in its entirety
        var X = this.r1 * Math.cos(angle1);
        var Y = this.r1 * Math.sin(angle1);
        var Z = this.r2 * Math.cos(angle2);
        var W = this.r2 * Math.sin(angle2);

        // Returns the noise of X, Y, Z amd W, but converts from range [-1, 1] to [0, 1]
        return (this.simplexNoise.noise4D(X, Y, Z, W) + 1) / 2;


    }



    /* newSeed([value]):  */
    /**
     * Sets the seed of the internal simplex noise function as value.
     * If value in not passed in, a random seed is selected
     * @param {Any} value Valor para a seed
     * @returns {Any} this.seed
     */
    newSeed(value) {


        if (arguments.length === 0) {
            // If not passed in the seed property is randomized
            this.seed = Math.round(Math.random() * 1000);
        } else {
            // Else it's the value passed
            this.seed = value;
        }

        // The simplex noise internal seed is set as the new seed
        this.simplexNoise = new SimplexNoise(this.seed);

        // Returns the new seed
        return this.seed;


    }



}