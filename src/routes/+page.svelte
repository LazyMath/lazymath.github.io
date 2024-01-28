<script>  
import { onMount } from "svelte";
import disp_data from "../store";
import ChatBot from "$lib/chat-bot.svelte";
function scroll_to_intro(entry) {
    document.getElementById(entry)?.scrollIntoView(true);
}
onMount(() => {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add("show-animate");
            entry.target.classList.remove("hidden-animate");
        };
    })

})
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
})
onMount(() => {
    document.body.classList.remove("about-theme");
    document.body.classList.add("home-theme");
    document.body.classList.remove("contact-theme");
    if (document.body.classList.contains("dark-mode")){
        $disp_data = {
            "svg_id": "/sun.svg",
            "logo_id": "/logo-dark.svg",
            "compass_id":  "/compass-dark.svg"
        }
    }
    else {
        $disp_data = {
            "svg_id": "/moon.svg",
            "logo_id": "/logo-light.svg",
            "compass_id": "/compass-light.svg"
        }
    }
})
const func_info = [
    {
        name: "Asymptotes (asymp)",
        purpose: "Determines the vertical and horizontal asymptotes of a function",
        syntax: "asymp(function, variable)",
        img: "asymp"
    },
    {
        name: "Composite Check (ccheck)",
        purpose: "Checks whether a composite function is valid, and the maximal domain required for the composite to be valid.",
        syntax: "ccheck(function 1, function 2)",
        img: "ccheck"
    },
    {
        name: "Discriminant (discrim)",
        purpose: "Calculates the discriminant of an inputted quadratic expression",
        syntax: "discrim(quadratic Expr, variable)",
        img: "discrim"
    },
    {
        name: "Domain and Range (domrang)",
        purpose: "Determines the domain and range of a function",
        syntax: "domrang(function, variable)",
        img: "domrang"
    },
    {
        name: "Intercepts (intercepts)",
        purpose: "Finding the x and y intercepts of a function",
        syntax: "intercepts(function,variable)",
        img: "intercepts"
    },
    {
        name: "Intersects (intersects)",
        purpose: "Determines the points of intersection of two functions across their maximal domains.",
        syntax: "intersects(function1,function2,variable)",
        img: "intersects"
    },
    {
        name: "Intersects with domain (intersectsd)",
        purpose: "Determines the points of intersection between two functions in a restricted domain",
        syntax: "intersectsd(function1, function2, variable, lower, upper)",
        img: "intersectsd"
    },
    {
        name: "Inverse Function (inverse)",
        purpose: "Determines the inverse of a function",
        syntax: "inverse(function, variable, x in domain of f)",
        img: "inverse"
    },
    {
        name: "Inverse Intersections (invints)",
        purpose: "Determines the values of a parameter, k, required for a function and its inverse function to have a certain number of intersections",
        syntax: "invints(function, number of intersections with inverse)",
        img: "invints",
        index: 9,
        cases: 7
    },
    {
        name: "Unique, None, Infinite Solution (linesolve)",
        purpose: "Determines when two linear equations will have an unique, none or infinitely many solutions",
        syntax: "linesolve(Equation1, Equation2)",
        img: "linesolve"
    },
    {
        name: "Property Check (pcheck)",
        purpose: "Determines which function satisfies a specific property",
        syntax: "pcheck(function, variable, LHS, RHS)",
        img: "pcheck"
    },
    {
        name: "Point Information (pointinfo)",
        purpose: "Determines the gradient, perpendicular gradient, line, x and y intercepts of a line, midpoint, distance",
        syntax: "pointinfo(x1, y1, x2, y2)",
        img: "pointinfo"
    },
    {
        name: "Transformations (transform)",
        purpose: "Determines the transformed function after applying certain transformations",
        syntax: "transform(function, {transformations})",
        img: "transform"
    },
];
const calc_info = [
    {
        name: "Average Rate of Change (avgroc)",
        purpose: "Determines the average rate of change of a function",
        syntax: "avgroc(function, variable, lower, upper)",
        img: "avgroc"
    },
    {
        name: "Average Value (avgval)",
        purpose: "Calculates the average value of a function",
        syntax: "avgval(function, variable, lower, upper)",
        img: "avgval"
    },
    {
        name: "Bound Area (boundarea)",
        purpose: "Determines the area bound by two graphs (if any) across their maximal domains",
        syntax: "boundarea(function1, function2, variable)",
        img: "boundarea"
    },
    {
        name: "Bound Area with domain (boundaread)",
        purpose: "Determines the bound area between two functions in a restricted domain",
        syntax: "boundaread(function1, function2, variable, lower, upper)",
        img: "boundaread"
    },
    {
        name: "Integral Solve (intsolve)",
        purpose: "Determines the answer for the integration multiple choice questions",
        syntax: "intsolve({lower1, upper1, value1, lower2, upper2, value2}, {transformations}, {lower3, upper3})",
        img: "intsolve",
        index: 0,
        cases: 3,
    },
    {
        name: "Newton's Method (newtons)",
        purpose: "Estimates the root of a function using newton's method",
        syntax: "newtons(function, variable, x0, iterations)",
        img: "newtons"
    },
    {
        name: "Points of Inflection (pois)",
        purpose: "Determines the points of inflection of a function",
        syntax: "pois(function, variable)",
        img: "pois"
    },
    {
        name: "Stationary Points (stps)",
        purpose: "Determines the stationary points of a function",
        syntax: "stps(function, variable)",
        img: "stps"
    },
    {
        name: "Trapezoid Approximation (trapapprox)",
        purpose: "Approximates an integral using the trapezoidal rule",
        syntax: "trapapprox(function, variable, lower, upper, number of trapezia)",
        img: "trapapprox"
    }    
];
const contpr_info = [
    {
        name: "Continuous Conditional Probability (ccondpr)",
        purpose: "Determines conditional probability for a continuous distribution",
        syntax: "ccondpr(Probability Density Function, Lower Bound, Upper Bound)",
        img: "ccondpr",
        index: 1,
        cases: 2
    },
    {
        name: "Confidence Interval (confint)",
        purpose: "Determines a confidence interval as well as the z-score, margin of error and standard deviation",
        syntax: "confint(Sample Size,P_hat, . confidence)",
        img: "confint"
    },
    {
        name: "Confidence Interval Solve (confintsolve)",
        purpose: "Determines the sample size, standard deviation or percentage confidence depending on the provided data",
        syntax: "confintsolve(Lower Bound, Upper Bound, Sample Size or Sample Standard Deviation or . Confidence)",
        img: "confintsolve"
    },
    {
        name: "Continuous Distribution Information (continfo)",
        purpose: "Determines the expected value, mean, variance, standard deviation of a continuous probability distribution",
        syntax: "continfo(function, variable, lower, upper)",
        img: "continfo"
    },
    {
        name: "Inverse Normal (invnormvals)",
        purpose: "Determines the left, right and centre possibilities for probability of a distribution",
        syntax: "invnormvals(mean, standard deviation, probability)",
        img: "invnormvals"
    },
    {
        name: "Normal Solve (normsolve)",
        purpose: "Determines the mean and standard deviation for lower and upper type questions",
        syntax: "normsolve(Lower, Probability of Lower, Upper, Probability of Upper)",
        img: "normsolve",
        index: 2,
        cases: 5
    },
];
const discpr_info = [
    {
        name: "Binomial Distribution Information (binominfo)",
        purpose: "Determines the expected value, variance, standard deviation, sample expected value, and sample standard deviation for a binomial distribution",
        syntax: "binominfo(Sample Size, Probability of Success)",
        img: "binominfo"
    },
    {
        name: "Binomial Solve (binomsolve)",
        purpose: "Determines the number of trials required to achieve a certain probability",
        syntax: "binomsolve(outcome, probability of success, threshold value)",
        img: "binomsolve"
    },
    {
        name: "Discrete Conditional Probability (dcondpr)",
        purpose: "Determines conditional probability for a discrete distribution",
        img: "dcondpr",
        index: 3,
        cases: 3
    },
    {
        name: "Hypergeometric Cumulative Probability Function (hypergeocdf)",
        purpose: "Determines the probability of selecting items without replacement, but over an interval of outcomes",
        syntax: "hypergeocdf(sample size, population size, number of successful items, lower bound, upper bound)",
        img: "hypergeocdf"
    },
    {
        name: "Hypergeometric Probability Density Function (hypergeopdf)",
        purpose: "Determines the probability of selecting items without replacement, but for specific outcomes",
        syntax: "hypergeopdf(sample size, population size, number of successful items, outcome)",
        img: "hypergeopdf"
    },
    {
        name: "Inverse Binomial (invbinomial)",
        purpose: "Determines the outcome required to achieve the probability",
        syntax: "invbinomial(number of trials, probability of success, known probability value)",
        img: "invbinomial"
    },
    {
        name: "Probability Table (prtable)",
        purpose: "Determines the mean, variance, standard deviation of a probability table",
        syntax: "prtable({outcomes}, {probabilities})",
        img: "prtable"
    },
    {
        name: "Sample Distribution Binomial (samplebinom)",
        purpose: "Determines the distribution for the sample proportion of a binomially distributed sample",
        syntax: "samplebinom(Sample Size, Probability of Success)",
        img: "samplebinom"
    },
    {
        name: "Sample Binomial Probability (samplebinompr)",
        purpose: "Determines the probability for the sample proportion for a binomially distributed sample",
        syntax: "samplebinompr(Sample Size, Probability of Success, Lower, Upper)",
        img: "samplebinompr"
    },
    {
        name: "Sample Distribution Hypergeometric (samplehypergeo)",
        purpose: "Determines the distribution for the sample proportion of a hypergeometrically distributed sample",
        syntax: "samplehypergeo(Sample Size, Population Size, Number Successful)",
        img: "samplehypergeo"
    },
    {
        name: "Sample Hypergeometric probability (samplehyppr)",
        purpose: "Determines the probability for the sample proportion for a hypergeometrically distributed sample",
        syntax: "samplehyppr(Sample Size, Population Size, Number Successful, Lower, Upper)",
        img: "samplehyppr"
    },
];
const misc_mm_info = [
    {
        name: "Column Augment (ca)",
        purpose: "Converts answer into easily readable matrix form",
        img: "ca",
        index: 6,
        cases: 2
    },
    {
        name: "Domain Solve (dsolve)",
        purpose: "Solves equations in a restricted domain",
        syntax: "dsolve(Equation, Variable, Lower Bound, Upper Bound)",
        img: "dsolve"
    },
    {
        name: "Graph Information (graphinfo)",
        purpose: "Determines the endpoints, x-intercepts, y-intercepts, stationary points, points of inflection of a function",
        img: "graphinfo",
        index: 7,
        cases: 2
    },
    {
        name: "Rewrite (rr)",
        purpose: "Gets the right hand side of an equation/answer",
        syntax: "rr(Equation/Answer)",
        img: "rr"
    },
    {
        name: "Triganometric Solve (tsolve)",
        purpose: "Gives exact values of circular function equations (Ones which TiNspire cannot properly solve on its own)",
        img: "tsolve",
        index: 8,
        cases: 2
    }
];
const udf_info_mm = [
    calc_info,
    contpr_info,
    discpr_info,
    func_info,
    misc_mm_info
];
const titles_mm = [
    "Calculus",
    "Continuous Probability",
    "Discrete Probability",
    "Functions",
    "Miscellaneous"
];
const vectors_info = [
    {
        name: "Unit Vector Bisector (bisec)",
        purpose: "Determines the unit vector which bisects the angle between two vectors",
        syntax: "bisec(vector 1, vector 2)",
        img: "bisec"
    },
    {
        name: "Colinear (colin)",
        purpose: "Determines value(s) of a variable required for points to be collinear",
        syntax: "colin(Point 1, Point 2, Point 3)",
        img: "colin"
    },
    {
        name: "Linear Dependence (lindep)",
        purpose: "Determines value(s) of a variable required for 3 vectors to be linearly dependent",
        syntax: "lindep(Vector 1, Vector 2, Vector 3)",
        img: "lindep"
    },
    {
        name: "Vector Projection (vproj)",
        purpose: "Determines vector, scalar resolute, & angle for two inputted vectors",
        syntax: "vproj(Vector 1, Vector 2)",
        img: "vproj"
    }
];
const linalg_info = [
        {
            name: "Line Cartesian to Vector (car2vecline)",
            purpose: "Converts equation of line from cartesian form to vector form",
            syntax: "car2vecline(line Cartesian)",
            img: "car2vecline"
        },
        {
            name: "Plane Cartesian to Vector (car2vecplane)",
            purpose: "Converts equation of plane from cartesian form to vector form",
            syntax: "car2vecplane(Plane Cartesian)",
            img: "car2vecplane"
        },
        {
            name: "Line Vector to Cartesian (vec2carline)",
            purpose: "Converts equation of line from vector form to cartesian form",
            syntax: "vec2carline(line Vector)",
            img: "vec2carline"
        },
        {
            name: "Plane Vector to Cartesian (vec2carplane)",
            purpose: "Converts equation of plane from vector form to cartesian form",
            syntax: "vec2carplane(Plane Vector)",
            img: "vec2carplane"
        },
        {
            name: "Minimum Distance between 2 lines (dist2l)",
            purpose: "Determines minimum distance between two lines",
            syntax: "dist2l(Line Vector 1, Line Vector 2)",
            img: "dist2l"
        },
        {
            name: "Minimum Distance between 2 planes (dist2pl)",
            purpose: "Determines minimum distance between two planes",
            syntax: "dist2pl(Plane Cartesian 1, Plane Cartesian 2)",
            img: "dist2pl"
        },
        {
            name: "Minimum Distance between line and plane (distlpl)",
            purpose: "Determines the minimum distance between a plane and line",
            syntax: "distlpl(Line Vector, Plane Cartesian)",
            img: "distlpl"
        },
        {
            name: "Minimum Distance between line and point (distlp)",
            purpose: "Determines minimum distance between a line and point",
            syntax: "distlp(Line Vector, Point)",
            img: "distlp"
        },
        {
            name: "Minimum Distance between plane and point (distplp)",
            purpose: "Determines minimum distance between a plane and point",
            syntax: "distlp(Plane Equation, Point)",
            img: "distplp"
        },
        {
            name: "Intersection between 2 lines (ints2l)",
            purpose: "Determines the point of intersection & angle between two lines",
            syntax: "ints2l(Line Vector 1, Line Vector 2)",
            img: "ints2l"
        },
        {
            name: "Intersection between 2 planes (ints2pl)",
            purpose: "Determines the line of intersection & angle between two planes",
            syntax: "ints2pl(Plane Cartesian 1, Plane Cartesian 2)",
            img: "ints2pl"
        },
        {
            name: "Intersection between plane and line (intslpl)",
            purpose: "Determines the point of intersection & angle between line and plane",
            syntax: "intslpl(Line Vector, Plane Cartesian)",
            img: "intslpl"
        },
        {
            name: "Create line with 2 points (line2p)",
            purpose: "Determines the equation of a line given two points",
            syntax: "line2p(Point 1, Point 2)",
            img: "line2p"
        },
        {
            name: "Create line with direction vector and point (linedp)",
            purpose: "Determines the equation of a line given a direction vector and point",
            syntax: "linedp(Direction Vector, Point)",
            img: "linedp"
        },
        {
            name: "Create plane with 3 points (plane3p)",
            purpose: "Determines the equation of a plane given three points",
            syntax: "plane3p(Point 1, Point 2, Point 3)",
            img: "plane3p"
        },
        {
            name: "Create plane with normal and point (planenp)",
            purpose: "Determines the equation of a plane given a normal vector and a point",
            syntax: "planenp(Normal Vector, Point)",
            img: "planenp"
        },
        {
            name: "Plane formed by intersecting lines (planeintl)",
            purpose: "Determines the equation of the plane formed by two intersecting lines",
            syntax: "planeintl(Line Vector 1, Line Vector 2)",
            img: "planeintl"
        }
];
const complex_info = [
    {
        name: "De Moivre's Theorem (demoiv)",
        purpose: "Determines the solutions to roots of unity questions",
        syntax: "demoiv(Power , Number)",
        img: "demoiv"
    },
    {
        name: "Circle Locus First Form (locicir1)",
        purpose: "Determines cartesian equation of circle loci in the form |z - a| = r",
        syntax: "locicir1(Point , Radius)",
        img: "locicir1"
    },
    {
        name: "Circle Locus Second Form (locicir2)",
        purpose: "Determines cartesian equation of circle loci in the form |z - a| = k|z - b|",
        syntax: "locicir2(Point 1, Point 2, k)",
        img: "locicir2"
    },
    {
        name: "Ellipse Locus (lociellp)",
        purpose: "Determines cartesian equation of ellipse loci",
        syntax: "lociellp(Point 1, Point 2, Length)",
        img: "lociellp"
    },
    {
        name: "Hyperbola Locus (locihyp)",
        purpose: "Determines cartesian equation of hyperbola loci",
        syntax: "locihyp(Point 1, Point 2, Length)",
        img: "locihyp"
    },
    {
        name: "Line Locus (lociline)",
        purpose: "Determines cartesian equation of line in the form |z - a| = |z - b|",
        syntax: "lociline(Point 1, Point 2)",
        img: "lociline"
    },
    {
        name: "Quadratic Roots (quadroots)",
        purpose: "Determines quadratic roots of a complex number algebraically",
        syntax: "quadroots(Number)",
        img: "quadroots"
    },
    {
        name: "Ray (ray)",
        purpose: "Determines the cartesian equation of a ray given a point and an angle",
        syntax: "ray(Point, Angle)",
        img: "ray"
    },
    
];
const calculus_info = [
    {
        name: "Arc Length (arclength)",
        purpose: "Determines the arc length for parametric curve",
        syntax: "arclength(Position Vector, Variable, Lower Bound, Upper Bound)",
        img: "arclength",
        cases: 1,
        index: 4,
    },
    {
        name: "Bound Volume (boundvol)",
        purpose: "Determines the volume of the solid formed by the region(s) bound by two curves",
        syntax: "boundvol(Function 1, Function 2, Variable)",
        img: "boundvol"
    },
    {
        name: "Euler's Method (eulers)",
        purpose: "Uses euler's method to estimate the solution to a differential equation",
        syntax: "eulers(Differential Equation, Independent Variable, x0, xn, y0, step-size)",
        img: "eulers"
    },
    {
        name: "Mixing Problems (mix)",
        purpose: "Determines the differential equation of the mixing problem",
        syntax: "mix() (You will be prompted for inputs)",
        img: "mix"
    },
    {
        name: "Surface Area of Solid (surfarea)",
        purpose: "Determines the surface area of a solid of revolution",
        syntax: "surfarea(Function, Variable, Lower Bound, Upper Bound)",
        img: "surfarea",
        cases: 3,
        index: 5,
    },
    
];
const kinematics_info = [
    {
        name: "Collision Detector (collision)",
        purpose: "Determines whether two particles collide and where their paths intersect",
        syntax: "collision(Position Vector 1, Position Vector 2)",
        img: "collision"
    },
    {
        name: "Projectile Motion (projm)",
        purpose: "Determines the accleration, velocity, position, max height, max displacement, return speed of a particle",
        syntax: "projm(Initial Position, Initial Velocity, Launch Angle, Initial Acceleration)",
        img: "projm"
    },
    {
        name: "Constant Acceleration Equations (suvat)",
        purpose: "Enter 3 known values and 2 unknown variables, it will determine the unknowns",
        syntax: "suvat(s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time))",
        img: "suvat"
    },
    
];
const probability_info = [
    {
        name: "Sample Mean Confidence Interval (confint)",
        purpose: "Determines the confidence interval for the sample mean",
        syntax: "confint(Sample Mean, Population Standard Deviation, Sample Size, . confidence)",
        img: "confint_sm"
    },
    {
        name: "Hypothesis Testing (hyptest)",
        purpose: "Determines whether the null hypothesis should be rejected by calculating p-values",
        syntax: "hyptest() (You will be prompted for inputs)",
        img: "hyptest"
    },
    {
        name: "Probability of Error (prerror)",
        purpose: "Determines the probability of Type I and Type II errors occuring",
        syntax: "prerror() (You will be prompted for inputs)",
        img: "prerror"
    },
    {
        name: "p-value (pval)",
        purpose: "Determines the p-value of a hypothesis test",
        syntax: "pval() (You will be prompted for inputs)",
        img: "pval"
    },
];
const udf_info_sm = [
    calculus_info,
    complex_info,
    kinematics_info,
    vectors_info,
    linalg_info,
    probability_info
];
const titles_sm = [
    "Calculus",
    "Complex Numbers",
    "Kinematics",
    "Vectors",
    "Linear Algebra",
    "Probability"
];
const multi_cases = [
    "intsolve",
    "ccondpr",
    "normsolve",
    "dcondpr",
    "arclength",
    "surfarea",
    "ca",
    "graphinfo",
    "tsolve",
    "invints"
];
const invints_info = [
    {
        function: "Square Root",
        syntax: "invints(function, number of intersections with inverse)",
    },
    {
        function: "Parabola",
        syntax: "invints(function, number of intersections with inverse) *You will be prompted to enter an initial condition",
    },
    {
        function: "Exponential",
        syntax: "invints(function, number of intersections with inverse)",
    },
    {
        function: "Logarithm",
        syntax: "invints(function, number of intersections with inverse)",
    },
    {
        function: "Hyperbola",
        syntax: "invints(function, number of intersections with inverse)",
    },
    {
        function: "Simple Cubic (Either 0 or 1 turning points)",
        syntax: "invints(function, number of intersections with inverse)",
    },
    {
        function: "Complicated Cubic (More than 1 turning point)",
        syntax: "invints(function, number of intersections with inverse) *You will be prompted to enter the domain",
    }
];
const intsolve_info = [
    {
        function: "One integral given, find transformed integral",
        syntax: "intsolve({lower1,upper1, value1}, {transformations}, {lower2, upper2})",
    },
    {
        function: "Two integrals given, find untransformed integral",
        syntax: "intsolve({lower1, upper1, value1}, {lower2, upper2, value2}, {lower3, upper3})"
    },
    {
        function: "Two integrals given, find transformed integral",
        syntax: "intsolve({lower1, upper1, value1, lower2, upper2, value2}, {transformations}, {lower3, upper3})"
    },
];
const ccondpr_info = [
    {
        function: "Probability density function",
        syntax: "ccondpr(Probability Density Function, Lower Bound, Upper Bound, Condition 1, Condition 2)"
    },
    {
        function: "Normal Distribution",
        syntax: "ccondpr(Blank String, Mean, Standard Deviation, Condition 1, Condition 2)"
    },
];
const normsolve_info = [
    {
        function: "Both Lower and Upper given",
        syntax: "normsolve(Lower, Probability of Lower, Upper, Probability of Upper)"
    },
    {
        function: "Lower and Mean given",
        syntax: "normsolve(Lower, Probability of Lower, Mean, Blank String)"
    },
    {
        function: "Lower and Standard Deviation given",
        syntax: "normsolve(Lower, Probability of Lower, Blank String, Standard Deviation)"
    },
    {
        function: "Upper and Mean given",
        syntax: "normsolve(Mean, Blank String, Upper, Probability of Upper)"
    },
    {
        function: "Upper and Standard Deviation given",
        syntax: "normsolve(Blank String, Standard Deviation, Upper, Probability of Upper)"
    },
];
const dcondpr_info = [
    {
        function: "Binomial Distribution",
        syntax: "dcondpr(number of trials, probability of success, condition 1, condition 2)"
    },
    {
        function: "Discrete Probability Table",
        syntax: "dcondpr({List containing outcomes}, {List containing probabilities}, condition 1, condition 2)"
    },
    {
        function: "Probability Mass Function",
        syntax: "dcondpr({List containing outcomes}, PMF, condition 1, condition 2)"
    },
];
const arclength_info = [
    {
        function: "Function",
        syntax: "arclength(Function, Variable, Lower Bound, Upper Bound)",
        cases: 2
    },
    {
        function: "Parametric Equation",
        syntax: "arclength(Vector, Variable, Lower, Upper)"
    },
];
const surfarea_info = [
    {
        function: "Function of x rotated about x-axis",
        syntax: "surfarea(Function, Variable, Lower Bound, Upper Bound)"
    },
    {
        function: "Function of y rotated about y-axis",
        syntax: "surfarea(Function, Variable, Lower Bound, Upper Bound)"
    },
    {
        function: "Function of x rotated about y-axis",
        syntax: "surfarea(Function, y, x-lower, x-upper)"
    },
    {
        function: "Parametric Equation",
        syntax: "surfarea(Function, t, Lower Bound, Upper Bound)"
    },
];
const ca_info = [
    {
        function: "One Variable",
        syntax: "surfarea(Function, t, Lower Bound, Upper Bound)"
    },
    {
        function: "Multiple Variables (Up to 5)",
        syntax: "ca(Ans, {var1, var2,..., var5}"
    },
];
const graphinfo_info = [
    {
        function: "Restricted Domain",
        syntax: "graphinfo(Function, Variable, Lower Bound, Upper Bound)"
    },
    {
        function: "Across Maximal Domain",
        syntax: "graphinfo(Function, Variable, Blank String, Random Character)"
    },
];
const tsolve_info = [
    {
        function: "Trigonometric Equation",
        syntax: "tsolve(Equation, Variable, Lower Bound, Upper Bound)"
    },
    {
        function: "Trigonometric Inequality",
        syntax: "tsolve(Inequality, Variable, Lower Bound, Upper Bound)"
    },
];
const multi_cases_info = [
    intsolve_info,
    ccondpr_info,
    normsolve_info,
    dcondpr_info,
    arclength_info,
    surfarea_info,
    ca_info,
    graphinfo_info,
    tsolve_info,
    invints_info
];

</script>
<div class = "info" id="scrollToTop">
    <div class = "centre_main">
        <div class ="main_display">
            <h1 class = "add_grad main-text">You will never think about buying UDFs ever again</h1>
        </div>
        <h1 class = "sub-main-text">Get access to high quality UDFs for <u>free</u></h1>
        <div class = "exp_button">
            <button class = "back_grad exp-prgm-button" on:click={() => scroll_to_intro("scrollToHere_1")}>
                <h1>Explore the programs</h1>
            </button>
        </div>
        <div class = "down_arrow">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div class = "main_display">
        <div class = "intro hidden">
            <br id="scrollToHere_1">
            <h1 class = "animate">Introducing our revolutionary UDFs...</h1>
        </div>
        <div class = "row_1">
            <div class = "left_row_1 hidden">
                <img src="/images/quadroots_ad.jpg" class = "animate sample-img" id = "ad_img" alt="quadroots">
            </div>
            <div class = "right_row_1 hidden">
                <div class = "content_1 animate">
                   <div>
                        <ul>
                            <li>
                                <h3 class = "add_grad_3">Unparalleled Speed</h3>
                                <h5>Get the answer in mere <u>seconds</u></h5>
                            </li>
                            <li>
                                <h3 class = "add_grad_3">Full Worked Solutions</h3>
                                <h5>Our UDFs show all working needed to gain <u class = "change-under">full marks</u></h5>
                            </li>
                            <li>
                                <h3 class = "add_grad_3">Highly Competitive Price of $0.00</h3>
                                <h5>They are completely <u>free</u>!</h5>
                            </li>
                        </ul>
                   </div>
                </div>
            </div>
        </div>
    </div>
    <div class = "main_display">
        <div class = "intro_2">
            <br id="scrollToMM">
            <h1>Mathematical Methods UDFs</h1>
        </div>
        <div class = "mm-udf-info">
            {#each titles_mm as title, i}
                <h2 class = "add_grad_3">{title}</h2><br><br>
                {#each udf_info_mm[i] as udf, j}
                    <details class = "name no-cursor udf-infos">
                        <summary class = "udf-summary"><b>{udf.name}</b></summary>
                        <p><b>Function: </b>{udf.purpose}</p>
                        {#if multi_cases.includes(udf.img)}
                            {#each multi_cases_info[udf.index] as udf_case, k}
                                <details class = "name no-cursor" style="font-size: large;">
                                    <summary class = "udf-summary"><b>Case {k+1}: {udf_case.function}</b></summary>
                                    <p><b>Syntax: </b>{udf_case.syntax}</p>
                                    <p><b>Example:</b></p>
                                    <img class = "disp-img-2" src="/images/{udf.img}-{k+1}-example.png" alt = "udf_img_example">
                                    <br>
                                    <img class = "disp-img" src='/images/{udf.img}-{k+1}.png' alt = "udf_img">
                                </details><br>
                            {/each}
                        {:else}
                            <p><b>Syntax: </b>{udf.syntax}</p>
                            <p><b>Example:</b></p>
                            <img class = "disp-img-2" src="/images/{udf.img}-example.png" alt = "udf_img_example">
                            <br>
                            <img class = "disp-img" src='/images/{udf.img}.png' alt = "udf_img">
                        {/if}
                    </details><br>
                {/each}
            {/each}
        </div>
    </div>
    <div class = "main_display">
        <div class = "intro_3">
            <br id="scrollToSM">
            <h1>Specialist Mathematics UDFs</h1>
        </div>
        <div class = "sm-udf-info">
            {#each titles_sm as title, i}
                <h2 class = "add_grad_3">{title}</h2><br><br>
                {#each udf_info_sm[i] as udf, j}
                <details class = "name no-cursor udf-infos">
                    <summary class = "udf-summary"><b>{udf.name}</b></summary>
                    <p><b>Function: </b>{udf.purpose}</p>
                    {#if multi_cases.includes(udf.img)}
                        {#each multi_cases_info[udf.index] as udf_case, k}
                            <details class = "name no-cursor">
                                <summary class = "udf-summary"><b>Case {k+1}: {udf_case.function}</b></summary>
                                <p><b>Syntax: </b>{udf_case.syntax}</p>
                                <p><b>Example:</b></p>
                                <img class = "disp-img-2" src="/images/{udf.img}-{k+1}-example.png" alt = "udf_img_example">
                                <br>
                                <img class = "disp-img" src='/images/{udf.img}-{k+1}.png' alt = "udf_img">
                            </details><br>
                        {/each}
                    {:else}
                        <p><b>Syntax: </b>{udf.syntax}</p>
                        <p><b>Example:</b></p>
                        <img class = "disp-img-2" src="/images/{udf.img}-example.png" alt = "udf_img_example">
                        <br>
                        <img class = "disp-img" src='/images/{udf.img}.png' alt = "udf_img">
                    {/if}
                </details><br>
                {/each}
            {/each}
        </div>
    </div>
    <br id = "scrollToBottom">
    <div class = "main_display">
        <div class = "intro_4" >
            <h1>Download</h1>
            <h3>UDF Files:</h3>
            <div class = "link-text">
                <a class = "dwn-text-1" href = "/MM3&4_UDFs_v1.0.zip" download ><h2 class = "dwn-text-2"><u>Download Mathematical Methods UDFs</u></h2></a>
                <a class = "dwn-text-1" href = "/SM3&4_UDFs_v1.0.zip" download ><h2 class = "dwn-text-2"><u>Download Specialist Mathematics UDFs</u></h2></a>
            </div>
            <p><b>Note: </b>The latest version is v1.0. Please ensure that the version you install is up to date.</p>
            <h3>UDF Guides:</h3>
            <p>Want a guide to put in your bound reference? Well you're in luck! These will be coming soon... :D</p>
            <h3>Program Bugs:</h3>
            <p>After extensive testing our beta testers identified only a few bugs, with the vast majority of the programs working fine! :D</p>
            <p>While many of the programs worked fine for us, if you encounter any issues or difficulties, please contact us and we will try to help you out.</p>
            <h5>Bugs Identified:</h5>
            <ul>
                <li><p>Domain and Range function does not handle parameters well</p></li>
                <li><p>Domain and Range may give inaccurate results if the domain is not restricted for complicated functions</p></li>
            </ul>
        </div>
    </div>
</div>
<ChatBot></ChatBot>
<style>

</style>