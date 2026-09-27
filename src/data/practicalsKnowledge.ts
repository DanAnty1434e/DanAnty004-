import { KnowledgeEntry } from '../utils/chatGptKnowledgeEngine';

export const PRACTICALS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'Acid-Base Titration Practical',
    keywords: ['titration', 'practical on titration', 'acid base practical', 'volumetric analysis', 'titration experiment', 'titration practical', 'standard solution practical'],
    markdown: `### **Acid-Base Volumetric Titration Practical**

**Aim of Experiment:**  
To determine the unknown concentration of a solution of hydrochloric acid ($HCl$) by titrating it against a standard $0.050\\text{ mol/dm}^3$ sodium trioxocarbonate(IV) ($Na_2CO_3$) solution using methyl orange indicator.

---

### **Laboratory Apparatus & Setup Diagram**

![Standard Acid-Base Volumetric Titration Laboratory Setup](/practicals/titration_diagram.jpg)

**Apparatus Checklist:**
- **$50\\text{ cm}^3$ Calibrated Glass Burette** held vertically in a retort stand clamp.
- **$25.0\\text{ cm}^3$ Volumetric Pipette** and rubber safety filler bulb.
- **$250\\text{ cm}^3$ Conical (Erlenmeyer) Flasks** (3 units).
- **White Ceramic Tile** placed under the flask for clear contrast.
- **Small glass funnel** and wash bottle with distilled water.

---

### **Step-by-Step Procedure**

1. **Rinse Apparatus:** Rinse the burette with acid solution ($HCl$) and the pipette with base solution ($Na_2CO_3$) to avoid dilution errors.
2. **Pipetting:** Pipette exactly $25.0\\text{ cm}^3$ of $Na_2CO_3$ base solution into a conical flask.
3. **Indicator:** Add exactly $2-3$ drops of methyl orange indicator. The solution turns **straw yellow**.
4. **Burette Setup:** Fill the burette with $HCl$, flush the nozzle to eliminate any trapped air bubble, and record the initial burette reading ($V_0 = 0.00\\text{ cm}^3$).
5. **Titration:** Place the conical flask on the white tile under the burette. Add acid while constantly swirling the flask. As the endpoint approaches, add titrant drop-by-drop.
6. **Endpoint:** Stop immediately when one drop turns the yellow solution into a **persistent faint orange-pink**. Record the final burette reading.
7. **Repetition:** Repeat until at least two concordant titres (within $\\pm 0.10\\text{ cm}^3$) are obtained.

---

### **Observation & Titre Readings Table**

| Titration Run | Initial Burette Reading ($\\text{cm}^3$) | Final Burette Reading ($\\text{cm}^3$) | Volume of Acid Used $V_A$ ($\\text{cm}^3$) |
| :--- | :---: | :---: | :---: |
| **Rough Trial** | 0.00 | 22.80 | 22.80 |
| **1st Titration** | 0.00 | 22.40 | **22.40** |
| **2nd Titration** | 0.00 | 22.50 | **22.50** |
| **3rd Titration** | 0.00 | 22.40 | **22.40** |

$$\\text{Average Concordant Titre } \\bar{V}_A = \\frac{22.40 + 22.50 + 22.40}{3} = \\mathbf{22.43\\text{ cm}^3}$$

---

### **Stoichiometric Calculation**

Balanced chemical equation:
$$2HCl\\text{(aq)} + Na_2CO_3\\text{(aq)} \\longrightarrow 2NaCl\\text{(aq)} + H_2O\\text{(l)} + CO_2\\text{(g)}$$

From the mole ratio: $\\frac{n_A}{n_B} = \\frac{2}{1}$. Using the titration formula:
$$\\frac{C_A \\times V_A}{C_B \\times V_B} = \\frac{n_A}{n_B}$$

$$C_A = \\frac{2 \\times C_B \\times V_B}{V_A} = \\frac{2 \\times 0.050\\text{ mol/dm}^3 \\times 25.0\\text{ cm}^3}{22.43\\text{ cm}^3} \\approx \\mathbf{0.111\\text{ mol/dm}^3}$$

---

### **Key Exam Precautions**
- Always read the bottom of the curved meniscus at eye level to eliminate parallax error.
- Remove the funnel from the burette before taking readings so stray droplets do not alter volume.
- Do not blow out the last drop remaining in the tip of the pipette.`,
  },
  {
    topic: 'Simple Pendulum Practical',
    keywords: ['pendulum practical', 'simple pendulum', 'practical on g', 'acceleration due to gravity practical', 'pendulum experiment'],
    markdown: `### **Simple Pendulum Physics Practical: Determination of $g$**

**Aim of Experiment:**  
To determine the acceleration due to gravity ($g$) in the laboratory by timing the oscillations of a simple pendulum of varied lengths ($L$) and plotting a graph of $T^2$ against $L$.

---

### **Laboratory Apparatus & Setup Diagram**

![Simple Pendulum Laboratory Apparatus Setup](/practicals/pendulum_diagram.jpg)

**Apparatus Checklist:**
- **Rigid Retort Stand & Clamp** clamped firmly to the workbench.
- **Split Wooden Cork Pieces** holding string firmly at point of suspension.
- **Inextensible Light Cotton Thread** ($120\\text{ cm}$).
- **Spherical Brass Bob** (point mass).
- **$100\\text{ cm}$ Meter Rule** and **Digital Stopwatch** ($0.01\\text{ s}$).

---

### **Step-by-Step Procedure**

1. Set up the pendulum rig with thread length $L = 100.0\\text{ cm}$ measured from the underside of the split cork to the center of the bob.
2. Displace the bob sideways by a small angle ($\\theta < 10^\\circ$, approx $5\\text{ cm}$) and release gently so it swings in a single vertical plane without wobbling.
3. Start the stopwatch as the bob crosses the central equilibrium position and count 20 complete back-and-forth oscillations. Record the time $t$.
4. Calculate the period $T = \\frac{t}{20}$ and square of the period $T^2$.
5. Repeat for lengths $L = 80\\text{ cm}, 60\\text{ cm}, 50\\text{ cm},$ and $40\\text{ cm}$.

---

### **Observation & Data Readings Table**

| Length $L$ (cm) | Time for 20 Oscillations $t$ (s) | Period $T = t/20$ (s) | $T^2$ ($\\text{s}^2$) |
| :---: | :---: | :---: | :---: |
| **100.0** | 40.20 | 2.010 | 4.040 |
| **80.0** | 35.90 | 1.795 | 3.222 |
| **60.0** | 31.10 | 1.555 | 2.418 |
| **50.0** | 28.40 | 1.420 | 2.016 |
| **40.0** | 25.40 | 1.270 | 1.613 |

---

### **Graph & Determination of $g$**

The theoretical equation for a simple pendulum is:
$$T = 2\\pi \\sqrt{\\frac{L}{g}} \\implies T^2 = \\left(\\frac{4\\pi^2}{g}\\right) L$$

A plot of $T^2$ (y-axis) against $L$ in meters (x-axis) yields a straight line with slope:
$$\\text{Slope } S = \\frac{\\Delta (T^2)}{\\Delta L} = \\frac{4.04 - 1.61}{1.00 - 0.40} = \\frac{2.43}{0.60} \\approx \\mathbf{4.05\\text{ s}^2/\\text{m}}$$

Calculating acceleration due to gravity:
$$g = \\frac{4\\pi^2}{\\text{Slope}} = \\frac{4 \\times 3.1416^2}{4.05} \\approx \\mathbf{9.75\\text{ m/s}^2}$$

---

### **Key Exam Precautions**
- Ensure the amplitude of swing is small ($\\theta < 10^\\circ$) so that the motion approximates Simple Harmonic Motion ($\\sin\\theta \\approx \\theta$).
- Eliminate drafts and air currents by closing laboratory windows.
- Time 20 oscillations rather than 1 to minimize human reaction time error.`,
  },
  {
    topic: 'Test for Starch in Green Leaf Practical',
    keywords: ['photosynthesis practical', 'test for starch in leaf', 'leaf practical', 'leaf starch practical', 'practical on photosynthesis', 'starch test'],
    markdown: `### **Biology Practical: Test for Starch in a Green Plant Leaf**

**Aim of Experiment:**  
To investigate whether starch is produced by a green leaf during photosynthesis, and demonstrate the standard 4-step protocol for chlorophyll removal and starch staining.

---

### **Laboratory Protocol & Setup Diagram**

![Test for Starch in a Green Plant Leaf Diagram](/practicals/leaf_starch_diagram.jpg)

---

### **The 4-Step Laboratory Procedure**

1. **Step 1: Boil Leaf in Water (60 - 90 seconds)**
   - *Action:* Dip the freshly picked sunlit green leaf into a beaker of boiling water using forceps.
   - *Reason:* Kills the plant protoplasm, denatures enzymes, and ruptures cell membranes to allow iodine to penetrate.

2. **Step 2: Decolourise Leaf in Warm Ethanol Bath (5 minutes)**
   - *Action:* Place the boiled leaf into a boiling tube containing 70% ethanol. Place the tube inside a beaker of hot water (water bath).
   - *Safety Note:* **NEVER heat ethanol directly over a flame!** Ethanol is volatile and highly flammable.
   - *Reason:* Ethanol dissolves and extracts the green chlorophyll pigment, leaving the leaf pale cream/white.

3. **Step 3: Rinse in Warm Water (10 seconds)**
   - *Action:* Remove the brittle, dehydrated leaf with forceps and dip it into warm water.
   - *Reason:* Softens the leaf and makes it pliable so it can be spread out flat without tearing.

4. **Step 4: Spread on White Tile & Apply Iodine Drops**
   - *Action:* Spread the pale leaf flat on a clean white tile. Add several drops of yellow-brown Lugol's iodine solution over the surface.
   - *Observation:* The sun-exposed parts turn **intense dark blue-black**, confirming the presence of starch.
   - *Control Experiment:* A leaf from a destarched plant kept in the dark remains pale yellow-brown (negative for starch).`,
  },
  {
    topic: 'Ohm’s Law Verification Practical',
    keywords: ['ohms law practical', 'ohm\'s law practical', 'practical on ohms law', 'electricity practical', 'resistor practical', 'verify ohms law'],
    markdown: `### **Physics Practical: Verification of Ohm’s Law & Determining Unknown Resistance**

**Aim of Experiment:**  
To verify Ohm’s law by measuring current ($I$) and potential difference ($V$) across an unknown resistor and calculating its resistance ($R$) from the slope of the $V-I$ graph.

---

### **Circuit Schematic & Setup Diagram**

![Circuit Diagram for Ohm’s Law Practical](/practicals/ohms_law_diagram.jpg)

**Apparatus:** DC battery supply ($3\\text{ V}$), key switch, rheostat (variable resistor), DC ammeter ($0-2\\text{ A}$) in series, DC voltmeter ($0-5\\text{ V}$) in parallel across test resistor, connecting wires.

---

### **Step-by-Step Method & Principle**

1. Connect the battery, switch, rheostat, ammeter, and unknown resistor in **series**. Connect the voltmeter in **parallel** across the resistor ends.
2. Insert the plug key. Slide the rheostat to set current $I = 0.20\\text{ A}$. Read the corresponding voltage $V$.
3. Open the switch immediately to avoid resistor heating ($H = I^2Rt$), which changes resistance.
4. Repeat for currents $I = 0.30\\text{ A}, 0.40\\text{ A}, 0.50\\text{ A},$ and $0.60\\text{ A}$.
5. Plot a graph of $V$ (y-axis) against $I$ (x-axis). The straight line passing through the origin verifies Ohm's law:
   $$R = \\frac{\\Delta V}{\\Delta I} = \\frac{2.40\\text{ V} - 0.80\\text{ V}}{0.60\\text{ A} - 0.20\\text{ A}} = \\frac{1.60}{0.40} = \\mathbf{4.00\\ \\Omega}$$`,
  },
  {
    topic: 'Glass Prism Refraction Practical',
    keywords: ['prism practical', 'glass prism practical', 'optics practical', 'refraction practical', 'angle of deviation practical'],
    markdown: `### **Physics Practical: Refraction Through an Equilateral Glass Prism**

**Aim of Experiment:**  
To trace the refraction of light rays through an equilateral triangular glass prism ($A = 60^\\circ$), measure angles of incidence ($i$) and deviation ($D$), and determine the minimum angle of deviation ($D_m$) and refractive index ($n$).

---

### **Ray Tracing & Setup Diagram**

![Equilateral Triangular Glass Prism Ray Tracing Setup](/practicals/prism_diagram.jpg)

---

### **Procedure & Key Calculation**
1. Fix drawing paper to board, trace triangular outline $ABC$. Draw normal line and incident ray with angle of incidence $i = 30^\\circ$.
2. Place optical pins $P_1$ and $P_2$ along the incident ray at least $4\\text{ cm}$ apart.
3. Looking through the opposite face of the prism, fix pins $P_3$ and $P_4$ such that all 4 pins appear aligned in a single straight line.
4. Remove prism, join lines, and measure angle of deviation $D$.
5. Repeat for $i = 35^\\circ, 40^\\circ, 45^\\circ, 50^\\circ, 60^\\circ$.
6. Graph of $D$ vs $i$ forms a smooth $U$-curve with minimum deviation $D_m \\approx 38^\\circ$.
7. Calculate refractive index:
   $$n = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)} = \\frac{\\sin\\left(\\frac{60^\\circ + 38^\\circ}{2}\\right)}{\\sin(30^\\circ)} = \\frac{\\sin(49^\\circ)}{0.5} \\approx \\mathbf{1.51}$$`,
  },
];
