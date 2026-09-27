export interface PracticalExperiment {
  id: string;
  title: string;
  shortTitle: string;
  subject: 'chemistry' | 'physics' | 'biology' | 'basic-technology' | 'agricultural-science';
  subjectName: string;
  category: string;
  examRelevance: string; // e.g. "WAEC & NECO Alternative to Practical / Paper 3"
  aim: string;
  theory: string;
  imageDiagramUrl: string;
  diagramCaption: string;
  diagramKeyPoints: string[];
  apparatus: { name: string; icon: string; purpose: string }[];
  reagents?: { name: string; formula: string; role: string }[];
  safetyPrecautions: string[];
  steps: { stepNumber: number; title: string; instruction: string; keyObservation: string }[];
  simulationType: 'titration' | 'pendulum' | 'leaf-starch' | 'ohms-law' | 'glass-prism';
  vivaQuestions: { question: string; answer: string }[];
}

export const PRACTICAL_EXPERIMENTS: PracticalExperiment[] = [
  {
    id: 'titration-acid-base',
    title: 'Volumetric Analysis: Acid-Base Neutralization Titration',
    shortTitle: 'Acid-Base Titration',
    subject: 'chemistry',
    subjectName: 'Chemistry',
    category: 'Quantitative Analysis (Volumetric)',
    examRelevance: 'WAEC / NECO / GCSE Chemistry Practical Paper 3 (Question 1)',
    aim: 'To standardize an unknown solution of hydrochloric acid (HCl) by titrating it against a standard 0.05 mol/dm³ anhydrous sodium trioxocarbonate(IV) (Na₂CO₃) solution using methyl orange indicator.',
    theory: 'The reaction between hydrochloric acid and sodium carbonate is: 2HCl(aq) + Na₂CO₃(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). From stoichiometry, mole ratio n_A/n_B = 2/1. Using the formula (C_A × V_A) / (C_B × V_B) = n_A / n_B, the concentration of the acid (C_A) is determined once the concordant titre volume (V_A) is found.',
    imageDiagramUrl: '/practicals/titration_diagram.jpg',
    diagramCaption: 'Standard Laboratory Acid-Base Titration Setup with Burette, Retort Stand, Conical Flask & White Tile',
    diagramKeyPoints: [
      'Retort Stand & Burette Clamp: Holds the 50 cm³ glass burette firmly vertical to prevent parallax error.',
      '50 cm³ Burette: Filled with standard acid; calibrated to 0.10 cm³ with glass stopcock for dropwise dispensing.',
      'Conical (Erlenmeyer) Flask: Swirled continuously during titration without spilling.',
      'White Ceramic Tile: Placed beneath flask to enhance contrast for detecting the exact pale orange-pink endpoint.',
      'Meniscus Reading: Read the bottom of the curved liquid meniscus at exact eye level.',
    ],
    apparatus: [
      { name: '50 cm³ Calibrated Burette', icon: '🧪', purpose: 'Holds the hydrochloric acid titrant and dispenses dropwise.' },
      { name: '25 cm³ Volumetric Pipette', icon: '💧', purpose: 'Accurately measures and transfers 25.0 cm³ of base into the flask.' },
      { name: '250 cm³ Conical Flasks (×3)', icon: '⚗️', purpose: 'Contains base and indicator; allows continuous swirling.' },
      { name: 'Retort Stand with Clamp', icon: '🔬', purpose: 'Clamps the burette vertically steady throughout titration.' },
      { name: 'White Ceramic Tile', icon: '⬜', purpose: 'Provides clear white backdrop to view sharp indicator color change.' },
      { name: 'Wash Bottle with Distilled Water', icon: '🧴', purpose: 'For rinsing apparatus walls without altering mole count.' },
    ],
    reagents: [
      { name: 'Hydrochloric Acid (HCl)', formula: 'HCl(aq)', role: 'Titrant of unknown concentration in burette.' },
      { name: 'Sodium Trioxocarbonate(IV)', formula: 'Na₂CO₃(aq)', role: 'Standard base solution (0.050 mol/dm³).' },
      { name: 'Methyl Orange Indicator', formula: 'C₁₄H₁₄N₃NaO₃S', role: 'Yellow in alkaline base, turns faint persistent orange-pink at endpoint (pH 3.1 - 4.4).' },
    ],
    safetyPrecautions: [
      'Rinse the burette with acid and pipette with base solution after washing with distilled water to prevent dilution.',
      'Ensure there is no air bubble trapped in the burette nozzle before taking the initial reading.',
      'Do not blow out the remaining drop in the tip of the pipette; it is calibrated to retain it.',
      'Add only 2 to 3 drops of indicator; excessive indicator is weakly acidic and introduces titration error.',
      'Swirl the flask constantly while adding acid dropwise near the expected endpoint.',
      'Read the bottom of the liquid meniscus at eye level to eliminate parallax error.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pipetting the Base',
        instruction: 'Use the pipette filler to draw 25.0 cm³ of Na₂CO₃ solution into the pipette. Deliver it smoothly into the clean 250 cm³ conical flask.',
        keyObservation: 'Liquid drains naturally by gravity; the last droplet remains in the jet without blowing.',
      },
      {
        stepNumber: 2,
        title: 'Adding Indicator',
        instruction: 'Add exactly 2 drops of methyl orange indicator into the conical flask and swirl gently.',
        keyObservation: 'The solution turns a bright, clear straw-yellow color in the alkaline environment.',
      },
      {
        stepNumber: 3,
        title: 'Burette Setup & Zeroing',
        instruction: 'Fill the burette with HCl using a small funnel, clamp it vertically, remove the funnel, and dispense a few drops to flush out any nozzle air bubble. Record initial reading V₀ = 0.00 cm³.',
        keyObservation: 'Continuous liquid column with no trapped air; meniscus rests precisely at 0.00 cm³.',
      },
      {
        stepNumber: 4,
        title: 'Titration to Endpoint',
        instruction: 'Place the flask on the white tile under the burette. Open the stopcock with your left hand around the barrel while swirling the flask with your right hand. Slow down to drop-by-drop as local flashes of orange appear.',
        keyObservation: 'At 22.40 cm³, a single drop produces a permanent faint orange/pink color that does not revert upon swirling.',
      },
    ],
    simulationType: 'titration',
    vivaQuestions: [
      {
        question: 'Why is the burette rinsed with the acid solution instead of just distilled water?',
        answer: 'Rinsing with acid removes droplets of distilled water that would otherwise dilute the acid and cause an erroneously high titre volume reading.',
      },
      {
        question: 'What is the color change at the endpoint when methyl orange is used?',
        answer: 'From yellow (in alkaline/carbonate solution) to persistent faint orange-pink at the neutral stoichiometric endpoint.',
      },
      {
        question: 'What is meant by concordant titres?',
        answer: 'Two or more titre volumes that differ by no more than ±0.10 cm³ (e.g., 22.40 cm³ and 22.50 cm³), ensuring experimental reproducibility.',
      },
    ],
  },
  {
    id: 'pendulum-experiment',
    title: 'Physics Practical: Determination of Acceleration Due to Gravity (g) Using a Simple Pendulum',
    shortTitle: 'Simple Pendulum (g)',
    subject: 'physics',
    subjectName: 'Physics',
    category: 'Mechanics & Oscillations',
    examRelevance: 'WAEC / NECO / Cambridge IGCSE Physics Practical Paper 3',
    aim: 'To determine the acceleration due to gravity (g) in the laboratory by measuring the period of oscillation (T) of a simple pendulum at varied lengths (L) and plotting a graph of T² against L.',
    theory: 'For a simple pendulum executing small angular oscillations (θ < 10°), the period of oscillation is given by: T = 2π√(L/g). Squaring both sides yields: T² = (4π²/g) × L. A plot of T² on the vertical axis against L on the horizontal axis yields a straight line passing through the origin with slope S = 4π²/g. Acceleration due to gravity is calculated as: g = 4π² / Slope.',
    imageDiagramUrl: '/practicals/pendulum_diagram.jpg',
    diagramCaption: 'Simple Pendulum Experimental Rig with Vertical Retort Stand, Split Cork, Suspension Thread & Heavy Metal Bob',
    diagramKeyPoints: [
      'Rigid Retort Stand: Firmly clamped to the laboratory bench to prevent wobble during oscillation.',
      'Split Cork Suspension: Clamps the thread firmly at a knife-edge point of suspension so length L is accurately defined.',
      'Inextensible Light Thread: Ensures the length L remains constant and thread mass is negligible.',
      'Small Angle (θ < 10°): Small amplitude ensures true Simple Harmonic Motion (SHM) where sin(θ) ≈ θ.',
      'Digital Stopwatch: Measures time for 20 complete back-and-forth oscillations to reduce human reaction error.',
    ],
    apparatus: [
      { name: 'Spherical Brass Bob', icon: '🟡', purpose: 'Dense point mass to minimize air resistance and define center of gravity.' },
      { name: 'Inextensible Cotton Thread (120 cm)', icon: '🧵', purpose: 'Light suspension string.' },
      { name: 'Retort Stand with Heavy Base & Clamp', icon: '🔬', purpose: 'Provides rigid, vibration-free vertical support.' },
      { name: 'Split Wooden Cork Pieces', icon: '🪵', purpose: 'Provides a sharp, unyielding point of suspension.' },
      { name: 'Meter Rule (100 cm)', icon: '📏', purpose: 'Measures pendulum length L from point of suspension to center of bob.' },
      { name: 'Digital Stopwatch (0.01 s)', icon: '⏱️', purpose: 'Measures time for 20 oscillations.' },
    ],
    safetyPrecautions: [
      'Ensure the angle of displacement does not exceed 10° (approx 5 cm displacement) so the motion remains simple harmonic.',
      'Measure length L from the underside of the split cork to the center of the bob (L = length of thread + radius of bob).',
      'Start the stopwatch as the bob passes the mean equilibrium position, not at the extreme turning point, for higher timing accuracy.',
      'Count 20 complete oscillations (one oscillation is forward and back to starting side) to minimize human reaction time error.',
      'Ensure air currents are eliminated by closing nearby windows or turning off fans.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Rig Setup & Length Setting',
        instruction: 'Pass the thread through the split cork in the clamp. Adjust thread length so L = 100.0 cm from underside of cork to the center of the bob.',
        keyObservation: 'Bob hangs vertically stationary directly over the equilibrium mark.',
      },
      {
        stepNumber: 2,
        title: 'Displacement & Oscillation',
        instruction: 'Displace the bob slightly sideways by about 5 cm (small angle < 10°) and release smoothly without spinning or circular motion.',
        keyObservation: 'Bob oscillates in a single vertical plane without elliptical wobble.',
      },
      {
        stepNumber: 3,
        title: 'Timing 20 Oscillations',
        instruction: 'Start the stopwatch as the bob crosses the central marker and count 20 full cycles (0, 1, 2, ... 20). Stop the timer and record time t₁.',
        keyObservation: 'Typical time for 20 swings at L = 100 cm is ~40.1 seconds (Period T ≈ 2.00 s).',
      },
      {
        stepNumber: 4,
        title: 'Varying Length L',
        instruction: 'Repeat the procedure for lengths L = 80 cm, 60 cm, 50 cm, and 40 cm. Compute T = t/20 and T² for each.',
        keyObservation: 'As length decreases, the period T decreases. T² vs L exhibits a strong linear relationship.',
      },
    ],
    simulationType: 'pendulum',
    vivaQuestions: [
      {
        question: 'Why must the amplitude of oscillation be kept small (less than 10 degrees)?',
        answer: 'The formula T = 2π√(L/g) is derived using the approximation sin(θ) ≈ θ in radians. At larger angles, the motion deviates from true Simple Harmonic Motion and the period increases.',
      },
      {
        question: 'Why do we time 20 oscillations rather than timing just 1 oscillation?',
        answer: 'Human reaction time error (typically ~0.2 s) when starting and stopping the timer is distributed across 20 cycles, reducing the percentage error by a factor of 20.',
      },
      {
        question: 'Does the mass of the bob affect the period of the simple pendulum?',
        answer: 'No. The period T depends only on the length of the pendulum L and gravitational acceleration g, independent of the bob mass (assuming negligible air resistance).',
      },
    ],
  },
  {
    id: 'biology-starch-leaf',
    title: 'Biology Practical: Test for Starch in a Green Plant Leaf (Photosynthesis Investigation)',
    shortTitle: 'Starch in Green Leaf',
    subject: 'biology',
    subjectName: 'Biology',
    category: 'Plant Physiology & Photosynthesis',
    examRelevance: 'WAEC / NECO / GCSE Biology Practical Paper 3',
    aim: 'To demonstrate that green leaves produce starch during photosynthesis when exposed to sunlight, and to understand the systematic 4-step laboratory protocol for chlorophyll extraction and starch testing.',
    theory: 'Green leaves synthesize glucose through photosynthesis: 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂. Excess glucose is rapidly converted and stored as starch grains within chloroplasts. Starch reacts with tri-iodide ions in Lugol\'s iodine solution to form an intense dark blue-black helical inclusion complex. Before testing, chlorophyll must be extracted using warm ethanol so the pale leaf reveals the color change clearly.',
    imageDiagramUrl: '/practicals/leaf_starch_diagram.jpg',
    diagramCaption: 'Illustrated 4-Step Biology Practical Protocol: Boiling Leaf, Ethanol Extraction in Water Bath, Water Rinse & Iodine Staining',
    diagramKeyPoints: [
      'Step 1 (Boiling in Water): Kills leaf cells, halts all enzyme activity, and ruptures cell membranes to make them permeable to reagents.',
      'Step 2 (Ethanol Water Bath): Dissolves green chlorophyll pigments. Note: Ethanol is flammable, so a boiling tube is placed inside a hot water bath, NEVER directly over a flame!',
      'Step 3 (Warm Water Rinse): Softens the brittle leaf after alcohol dehydration.',
      'Step 4 (Iodine Tile Staining): Spreads leaf on white tile; drops of iodine turn dark blue-black in areas containing starch.',
    ],
    apparatus: [
      { name: 'Beaker with Boiling Water (250 cm³)', icon: '🫗', purpose: 'For boiling leaf to break cell walls and kill protoplasm.' },
      { name: 'Boiling Tube with 70% Ethanol', icon: '🧪', purpose: 'Dissolves chlorophyll without scorching.' },
      { name: 'Electric Hot Plate / Water Bath', icon: '♨️', purpose: 'Safe heat source; prevents flammable ethanol vapor ignition.' },
      { name: 'White Ceramic Tile / Petri Dish', icon: '⬜', purpose: 'Provides clean white contrast for observing color staining.' },
      { name: 'Pair of Forceps (Tweezers)', icon: '🥢', purpose: 'For safely handling hot leaves in and out of boiling liquids.' },
      { name: 'Dropping Pipette', icon: '💧', purpose: 'Dispenses drops of iodine solution evenly over the leaf.' },
    ],
    reagents: [
      { name: 'Fresh Green Sunlit Leaf', formula: 'Plant specimen', role: 'Contains synthesized starch grains in chloroplasts.' },
      { name: '95% Ethanol / Methylated Spirits', formula: 'C₂H₅OH', role: 'Organic solvent that extracts green chlorophyll.' },
      { name: 'Lugol’s Iodine Solution', formula: 'I₂ + KI(aq)', role: 'Starch reagent; yellow-brown turning blue-black.' },
    ],
    safetyPrecautions: [
      'EXTREME FIRE SAFETY: Ethanol is highly flammable. Turn off open Bunsen flames or use a hot water bath when boiling the leaf in alcohol.',
      'Always use forceps to dip and remove the leaf from hot liquids to avoid scalding.',
      'Destarch control plants for 24-48 hours in complete darkness before starting comparative experiments (e.g., testing requirement for light or CO₂).',
      'Rinse the leaf in warm water after the alcohol bath; otherwise, the brittle dehydrated leaf will tear when unfolded on the tile.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Kill Leaf & Rupture Cell Membranes',
        instruction: 'Immerse the freshly plucked leaf into a beaker of briskly boiling water using forceps for 60 to 90 seconds.',
        keyObservation: 'Leaf turns slightly darker and wilts limp as cell membranes rupture and enzymes denature.',
      },
      {
        stepNumber: 2,
        title: 'Extract Chlorophyll Pigment',
        instruction: 'Transfer the leaf with forceps into a boiling tube filled with ethanol. Place the tube into the hot water bath for 5 minutes.',
        keyObservation: 'The ethanol turns vibrant emerald green as chlorophyll dissolves; the leaf turns pale off-white and brittle.',
      },
      {
        stepNumber: 3,
        title: 'Soften the Dehydrated Leaf',
        instruction: 'Remove the pale leaf from the alcohol tube and dip it into warm water for 10 seconds.',
        keyObservation: 'Leaf re-hydrates instantly and becomes soft, pliable, and easy to spread flat.',
      },
      {
        stepNumber: 4,
        title: 'Starch Staining with Iodine',
        instruction: 'Spread the softened leaf flat on the white tile. Add several drops of yellow-brown iodine solution across the lamina.',
        keyObservation: 'Within seconds, sun-exposed green zones turn intense dark blue-black, confirming the presence of starch.',
      },
    ],
    simulationType: 'leaf-starch',
    vivaQuestions: [
      {
        question: 'Why is the leaf boiled in alcohol inside a water bath rather than directly over a flame?',
        answer: 'Alcohol (ethanol) has a low boiling point and produces highly flammable vapors that can easily ignite if exposed to an open flame. A water bath provides controlled, flameless heat.',
      },
      {
        question: 'Why is it necessary to remove chlorophyll before testing for starch?',
        answer: 'Chlorophyll gives the leaf a dense green color that masks the yellow-brown to blue-black color transition of the iodine test, making it impossible to see the result clearly.',
      },
      {
        question: 'How do you destarch a plant before starting a photosynthesis experiment?',
        answer: 'Keep the potted plant in a dark cupboard for 24 to 48 hours. Without light, photosynthesis ceases and the plant consumes its stored starch reserves.',
      },
    ],
  },
  {
    id: 'physics-ohms-law',
    title: 'Physics Practical: Verification of Ohm’s Law & Determining Unknown Resistance (R)',
    shortTitle: 'Ohm’s Law & Resistor',
    subject: 'physics',
    subjectName: 'Physics',
    category: 'Electricity & Magnetism',
    examRelevance: 'WAEC / NECO / IGCSE Physics Practical Paper 3 (Electricity)',
    aim: 'To verify Ohm’s law by measuring current (I) at varying potential differences (V) across a standard resistor, plot the V-I characteristic graph, and calculate the resistance R from the slope.',
    theory: 'Ohm’s law states that the current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends, provided physical conditions such as temperature remain constant: V = I × R. Graphing potential difference V on the vertical axis against current I on the horizontal axis yields a straight line passing through the origin. The slope of the line equals the resistance: Slope = ΔV / ΔI = R (in Ohms, Ω).',
    imageDiagramUrl: '/practicals/ohms_law_diagram.jpg',
    diagramCaption: 'Circuit Diagram for Ohm’s Law Experiment showing DC Supply, Key, Rheostat, Series Ammeter & Parallel Voltmeter',
    diagramKeyPoints: [
      'DC Power Source (Batteries / Accumulator): Supplies steady electromotive force (e.g. 3.0V - 6.0V).',
      'Ammeter in Series: Measures the total electric current (I) flowing through the circuit; has very low internal resistance.',
      'Voltmeter in Parallel: Connected directly across the test resistor to measure potential drop (V); has very high internal resistance.',
      'Rheostat (Variable Resistor): Adjusts circuit resistance to obtain 5 different pairs of V and I values.',
      'Plug Key: Kept open between readings to prevent conductor heating which alters resistance.',
    ],
    apparatus: [
      { name: 'DC Power Supply (3V - 6V)', icon: '🔋', purpose: 'Provides constant electromotive force.' },
      { name: 'DC Ammeter (0 - 2.0 A)', icon: '🧭', purpose: 'Measures electric current flowing in series.' },
      { name: 'DC Voltmeter (0 - 5.0 V)', icon: '📟', purpose: 'Measures voltage drop across resistor in parallel.' },
      { name: 'Sliding Rheostat (0 - 50 Ω)', icon: '🎛️', purpose: 'Adjusts current levels systematically.' },
      { name: 'Constantan/Nichrome Test Resistor', icon: '⚡', purpose: 'The unknown ohmic conductor whose resistance R is to be measured.' },
      { name: 'Plug Key & Connecting Wires', icon: '🔌', purpose: 'Controls circuit connection.' },
    ],
    safetyPrecautions: [
      'Always connect the ammeter in SERIES with the circuit and the voltmeter in PARALLEL across the resistor.',
      'Ensure meter terminals match battery polarity (+ to + and - to -) to prevent damaging meter pointers.',
      'Remove the plug key immediately after taking each reading to prevent continuous current flow and Joule heating (H = I²Rt), which increases resistance.',
      'Check zero error on both meters before taking readings and correct any pointer offset.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Circuit Connection & Polarity Check',
        instruction: 'Connect battery, plug key, rheostat, ammeter, and test resistor in series. Connect voltmeter in parallel across test resistor.',
        keyObservation: 'Meters register zero with key open; connections are tight with clean copper ends.',
      },
      {
        stepNumber: 2,
        title: 'Initial Reading Setup',
        instruction: 'Insert the plug key. Slide the rheostat slider to set current I = 0.20 A on the ammeter. Read corresponding voltage V on the voltmeter.',
        keyObservation: 'For a 4.0 Ω resistor, the voltmeter reads V = 0.80 V. Disconnect key immediately after recording.',
      },
      {
        stepNumber: 3,
        title: 'Varying Rheostat for 5 Data Pairs',
        instruction: 'Repeat the measurement for currents I = 0.30 A, 0.40 A, 0.50 A, and 0.60 A, recording the voltage V for each setting.',
        keyObservation: 'Voltage increases proportionally: 1.20 V, 1.60 V, 2.00 V, 2.40 V.',
      },
      {
        stepNumber: 4,
        title: 'Graph Plotting & Slope Calculation',
        instruction: 'Plot graph of V (y-axis) against I (x-axis). Draw line of best fit through origin and calculate slope R = ΔV / ΔI.',
        keyObservation: 'Graph is a straight line passing through origin, verifying Ohm’s law with R = 4.0 Ω.',
      },
    ],
    simulationType: 'ohms-law',
    vivaQuestions: [
      {
        question: 'Why is an ammeter connected in series and a voltmeter in parallel?',
        answer: 'An ammeter has very low resistance so it measures circuit current without reducing it. A voltmeter has very high resistance so it draws negligible current when measuring voltage across a component.',
      },
      {
        question: 'Why must the plug key be opened immediately after taking each reading?',
        answer: 'Current flow generates heat (H = I²Rt). If the resistor heats up, its resistance increases, violating the condition that physical conditions and temperature remain constant.',
      },
      {
        question: 'What does the slope of the V against I graph represent?',
        answer: 'The slope (ΔV / ΔI) represents the electrical resistance (R) of the conductor in Ohms (Ω).',
      },
    ],
  },
  {
    id: 'physics-glass-prism',
    title: 'Physics Practical: Refraction of Light Through an Equilateral Triangular Glass Prism',
    shortTitle: 'Glass Prism Refraction',
    subject: 'physics',
    subjectName: 'Physics',
    category: 'Optics & Light',
    examRelevance: 'WAEC / NECO / Cambridge Optics Practical',
    aim: 'To trace the path of light rays through an equilateral triangular glass prism, measure the angle of incidence (i) and corresponding angle of deviation (D), plot the D against i curve, and determine the minimum angle of deviation (Dm) and refractive index (n).',
    theory: 'When a ray of light enters a triangular glass prism of refracting angle A = 60°, it bends towards the normal at the first face and away from the normal upon emerging into air at the second face. The angle between the incident ray and the emergent ray is the angle of deviation (D). As the angle of incidence (i) increases, D first decreases to a minimum value Dm, and then increases. At minimum deviation, the ray passes symmetrically through the prism, and the refractive index is: n = sin[(A + Dm)/2] / sin(A/2).',
    imageDiagramUrl: '/practicals/prism_diagram.jpg',
    diagramCaption: 'Ray Tracing Setup for Triangular Glass Prism on Drawing Board with Optical Pins P1, P2, P3, P4',
    diagramKeyPoints: [
      'Equilateral Prism (A = 60°): Clean polished optical crown glass prism.',
      'Drawing Board & White Sheet: Fixed flat with drawing pins.',
      'Incident Pins (P₁, P₂): Placed at least 4 cm apart along the incident ray to accurately define ray direction.',
      'Emergent Pins (P₃, P₄): Positioned such that looking through the other prism face, all 4 pins appear in one straight line.',
      'Angle of Deviation (D): Angle between forward extension of incident ray and backward extension of emergent ray.',
    ],
    apparatus: [
      { name: 'Equilateral Glass Prism (60°)', icon: '🔺', purpose: 'Refracting medium with apex angle A = 60°.' },
      { name: 'Wooden Drawing Board & Paper', icon: '📋', purpose: 'Flat surface for ray tracing sheet.' },
      { name: 'Optical Pins (×4)', icon: '📍', purpose: 'Mark incident and emergent optical ray lines.' },
      { name: '360° Protractor & 30 cm Ruler', icon: '📐', purpose: 'Measures angles i and D with 1° precision.' },
    ],
    safetyPrecautions: [
      'Ensure the optical pins P₁ and P₂ are separated by at least 4 cm; small separation magnifies sighting angle error.',
      'Pins must be erect and perpendicular to the paper.',
      'Look at the feet (bases) of the pins through the glass prism, not the tops, to avoid parallax error caused by tilted pins.',
      'Do not move the prism outline during tracing; draw the outline ABC firmly with a sharp pencil before placing pins.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prism Outline & Normal Line',
        instruction: 'Fix paper on board, place prism, trace outline ABC. On face AB, draw normal ON at midpoint and draw incident ray at i = 30°.',
        keyObservation: 'Prism rests flush against paper; normal line is exactly perpendicular to face AB.',
      },
      {
        stepNumber: 2,
        title: 'Pin Placement & Alignment',
        instruction: 'Fix pins P₁ and P₂ vertically along the incident ray at least 4 cm apart. Look through face AC and fix pins P₃ and P₄ so all 4 pins appear aligned in a straight line.',
        keyObservation: 'Images of P₁ and P₂ through the glass appear colinear with P₃ and P₄.',
      },
      {
        stepNumber: 3,
        title: 'Tracing Emergent Ray & Measuring D',
        instruction: 'Remove prism and pins. Draw emergent ray through P₃-P₄. Extend incident and emergent rays to intersect and measure angle of deviation D with protractor.',
        keyObservation: 'For i = 30°, measured deviation D ≈ 47°.',
      },
      {
        stepNumber: 4,
        title: 'Repeat for 5 Angles & Determine Dm',
        instruction: 'Repeat for i = 35°, 40°, 45°, 50°, and 60°. Plot D against i curve to find lowest point Dm ≈ 38°. Calculate n = sin((60°+38°)/2)/sin(30°) ≈ 1.51.',
        keyObservation: 'Graph forms a smooth U-shaped curve; calculated refractive index of crown glass is approximately 1.51.',
      },
    ],
    simulationType: 'glass-prism',
    vivaQuestions: [
      {
        question: 'Why should the optical pins be placed at least 4 cm apart?',
        answer: 'A greater distance between pins minimizes the angular error when joining the pin pricks to trace the ray of light, ensuring high angular accuracy.',
      },
      {
        question: 'Why does white light disperse into a spectrum of colors when passing through a prism?',
        answer: 'Glass has a different refractive index for different wavelengths of light (dispersion). Violet light has a shorter wavelength and refracts the most, while red has a longer wavelength and refracts the least.',
      },
      {
        question: 'What special condition occurs when a prism is at minimum deviation Dm?',
        answer: 'The ray of light passes symmetrically through the prism, meaning the angle of incidence equals the angle of emergence (i = e) and the refracted ray inside is parallel to the base of the equilateral prism.',
      },
    ],
  },
];
