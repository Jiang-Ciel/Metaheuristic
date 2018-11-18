// --- Consts ---
const
    POPULATION_SIZE = 50,
    LIFE_SPAN = 200,
    MAX_FORCE = 0.3,
    MUTATION = 0.02;

// --- Vars ---
var rx, ry, rw, rh, population, lifeP, target, count = 0;

function Rocket(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.count = LIFE_SPAN;

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);


        this.fitness = Math.pow(map(d, 0, width, 1000, 0), 2);

        if (this.completed) {
            this.fitness += Math.pow(map(this.count, 0, 250, 1000, 0), 3);
        }
        if (this.crashed) {
            this.fitness /= 10;
        }
    }

    this.update = function(count) {

        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
            if (this.count == LIFE_SPAN)
                this.count = count;
        }

        if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
            this.crashed = true;
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }



        this.applyForce(this.dna.genes[count]);
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    this.show = function() {
        push();
        noStroke();

        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        //rect(0, 0, 25, 6);
        fill(255, 150);
        triangle(0, -8, 25, 0, 0, 8);
        pop();
    }

}




function DNA(genes) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < LIFE_SPAN; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(MAX_FORCE);
        }
    }

    this.crossover = function(partner) {
        var
            newgenes = [],
            mid = floor(random(this.genes.length)),
            i = 0;
        for (i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }

    this.mutation = function() {
        var i = 0;
        for (i = 0; i < this.genes.length; i++) {
            if (random(1) < MUTATION) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(MAX_FORCE);
            }
        }
    }
}




function Population() {
    this.popsize = POPULATION_SIZE;
    this.rockets = [];
    this.matingpool = [];

    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.evaluate = function() {

        var maxfit = 0;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }

        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }

        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
        console.log(this.matingpool.length);
    }

    this.selection = function() {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    this.run = function(count) {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update(count);
            this.rockets[i].show();
        }
    }
}




// --- Main Control Flow ---


function setup() {

    createCanvas(600, 400)
    population = new Population();
    lifeP = createP();

    // Setting target's coordinates.
    target = createVector(width / 2, 50);

    // Setting obstacle's coordinates.
    rw = 200;
    rh = 10;
    rx = width * 0.5 - (rw / 2);
    ry = height * 0.5 - (rh / 2);
}

function draw() {
    background(197, 225, 165);
    population.run(count);
    lifeP.html(count);

    count++;
    if (count == LIFE_SPAN) {
        // Evaulating finess
        population.evaluate();
        // Performing natural selection and creating new population.
        population.selection();
        //population = new Population();
        count = 0;
    }

    noStroke();
    fill(255, 138, 101);
    rect(rx, ry, rw, rh);

    // Drawing the target
    ellipse(target.x, target.y, 16, 16);
}