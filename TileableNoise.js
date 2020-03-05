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
     * @param {Number} r Raio do círculo. Mude para alterar a aparência do ruído
     * @param {Number} fromX Valor em que o ruído inicia o ciclo no eixo X
     * @param {Number} toX Valor em que o ruído termina o ciclo no eixo X
     * @param {Number} [fromY] Valor em que o ruído inicia o ciclo no eixo Y
     * @param {Number} [toY] Valor em que o ruído termina o ciclo no eixo Y
     * @returns {TileableNoise} Instância da classe
     */
    constructor(r, fromX, toX, fromY, toY) {

        this.fromX = fromX;
        this.toX = toX;

        this.seed = Math.random();
        this.simplexNoise = new SimplexNoise(this.seed);

        if (arguments.length === 3) {

            this.fromY = fromX;
            this.toY = toX;

            this.r1 = this.r2 = r;

        } else if (arguments.length === 5) {

            this.fromY = fromY;
            this.toY = toY;

            this.r1 = r;
            this.r2 = r * Math.abs(toY - fromY) / Math.abs(toX - fromX);

        } else {

            throw new Error("Um número inválido de parâmetros foi dado (" + arguments.length + "), ao invés de 3 ou 5");

        }

    }



    /**
     * Evaluates the noise at values (x, t) onde x repete e t não (t age como o tempo)
     * @param {Number} x Valor para calcular o ruído
     * @param {Number} [t=0] t pode ser usado para animar o ruído. Valor padrão: 0
     * @returns {Number} Ruído entre [-1, 1]
     */
    eval1D(x, t = 0) {

        var angle = (x - this.fromX) / (this.toX - this.fromX) * 2 * Math.PI;

        var X = this.r1 * Math.cos(angle);
        var Y = this.r1 * Math.sin(angle);

        return this.simplexNoise.noise3D(X, Y, t);

    }



    /**
     * Evaluates the noise at values (x, y)
     * @param {Number} x Valor do eixo X para calcular o ruído
     * @param {Number} y Valor do eixo Y para calcular o ruído
     * @returns {Number} Ruído entre [-1, 1]
     */
    eval2D(x, y) {

        var angle1 = (x - this.fromX) / (this.toX - this.fromX) * 2 * Math.PI;
        var angle2 = (y - this.fromY) / (this.toY - this.fromY) * 2 * Math.PI;

        var X = this.r1 * Math.cos(angle1);
        var Y = this.r1 * Math.sin(angle1);
        var Z = this.r2 * Math.cos(angle2);
        var W = this.r2 * Math.sin(angle2);

        return this.simplexNoise.noise4D(X, Y, Z, W);

    }



    /**
     * Define a semente para a função interna geradora do ruído.
     * Caso não haja parâmetros, uma semente aleatória é escolhida
     * @param {Any} value Valor para a semente
     * @returns {TileableNoise} A instância da classe
     */
    newSeed(value = Math.random()) {

        this.seed = value;
        this.simplexNoise = new SimplexNoise(this.seed);
        return this;

    }



}