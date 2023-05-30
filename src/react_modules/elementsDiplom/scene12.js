
import React, { useState, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { Html } from '@react-three/drei';

const Scene12 = ({ layer }) => {
  const oWorter = [
    "o.k.",
    "oase",
    "ob",
    "obacht",
    "obdach",
    "obdachlos",
    "obdachlose",
    "obdachlosenasyl",
    "obdachlosenheim",
    "obdachloser",
    "obduktion",
    "obduzieren",
    "oben",
    "oben erwähnt",
    "oben genannt",
    "obenauf",
    "obendrauf",
    "obendrein",
    "obendrüber",
    "obenhin",
    "ober",
    "oberaufsicht",
    "oberbefehl",
    "oberbefehlshaber",
    "oberbekleidung",
    "oberbett",
    "obere",
    "oberfläche",
    "oberflächlich",
    "oberflächlichkeit",
    "obergescheit",
    "obergeschoss",
    "obergeschoß",
    "oberhalb",
    "oberhalb",
    "oberhaupt",
    "oberkante",
    "oberklasse",
    "oberkommando",
    "oberlehrer",
    "oberlehrerin",
    "oberleitung",
    "oberlippenbart",
    "obers",
    "oberschicht",
    "oberschule",
    "oberste",
    "oberstock",
    "obesität",
    "obfrau",
    "obgenannt",
    "obgleich",
    "obhut",
    "obig",
    "objekt",
    "objektiv",
    "objektivität",
    "objizieren",
    "obliegen",
    "obliegenheit",
    "obligat",
    "obligatorisch",
    "obligo",
    "obliquität",
    "obliteration",
    "obliterieren",
    "obmann",
    "obolus",
    "obrigkeit",
    "obschon",
    "obsekrieren",
    "observation",
    "observatorium",
    "observieren",
    "observierung",
    "obsession",
    "obsiegen",
    "obskur",
    "obskurant",
    "obskurantin",
    "obskurität",
    "obsoleszieren",
    "obsolet",
    "obsorge",
    "obstakel",
    "obstern",
    "obstinat",
    "obstination",
    "obstipation",
    "obstkern",
    "obstkiste",
    "obstruieren",
    "obstruktion",
    "obstruktiv",
    "obststeige",
    "obstwein",
    "obszön",
    "obszönität",
    "obturieren",
    "obwalten",
    "obwohl",
    "obzwar",
    "ochs",
    "ochse",
    "ochsen",
    "ochsenauge",
    "odem",
    "oder",
    "odeur",
    "odium",
    "odor",
    "öd",
    "öde",
    "öden",
    "ödheit",
    "ödland",
    "ödnis",
    "öffentlich",
    "öffentlichkeit",
    "öffentlichkeitsarbeit",
    "öffentlichkeitsbeteiligung",
    "öffi",
    "öffnen",
    "öffnung",
    "öfter",
    "öfters",
    "öko",
    "ökologisch",
    "ökonomie",
    "ökonomisch",
    "ökopax",
    "ökopaxler",
    "ökopaxlerin",
    "öl",
    "ölen",
    "ölig",
    "önomanie",
    "örtchen",
    "örtlich",
    "örtlichkeit",
    "öse",
    "ofen",
    "ofenwarm",
    "offen",
    "offen halten",
    "offen lassen",
    "offen stehen",
    "offenbar",
    "offenbaren",
    "offenbarung",
    "offenhalten",
    "offenheit",
    "offenherzig",
    "offenherzigkeit",
    "offenkundig",
    "offenlassen",
    "offenlegen",
    "offenlegung",
    "offensichtlich",
    "offensichtlich",
    "offensiv",
    "offensive",
    "offenstehen",
    "offerieren",
    "offert",
    "offerte",
    "offiziell",
    "offiziös",
    "offside",
    "oft",
    "oftmalig",
    "oftmals",
    "ogygisch",
    "oheim",
    "ohne",
    "ohne Weiteres",
    "ohnedem",
    "ohnedies",
    "ohnegleichen",
    "ohnehin",
    "ohneweiters",
    "ohnmacht",
    "ohnmachtsanfall",
    "ohnmachtshappen",
    "ohnmächtig",
    "ohnmächtig werden",
    "ohr",
    "ohrenbetäubend",
    "ohrenfällig",
    "ohrfeige",
    "ohrfeigen",
    "ohrgeräusch",
    "ohrwurm",
    "okay",
    "okay",
    "okkasion",
    "okkasionell",
    "okkult",
    "okkultismus",
    "okkultistisch",
    "okkupation",
    "okkupationsmacht",
    "okkupieren",
    "oktober",
    "oktopode",
    "oktroyieren",
    "okulieren",
    "okzident",
    "oldschool",
    "oligarchie",
    "oll",
    "olle",
    "oller",
    "olympisch",
    "oma",
    "ombrage",
    "omelett",
    "omelette",
    "omen",
    "omi",
    "ominös",
    "omnibus",
    "omnipotent",
    "omnipotenz",
    "on top",
    "onanie",
    "onanieren",
    "ondit",
    "onerieren",
    "online",
    "onlinekriminalität",
    "opa",
    "opak",
    "opalisieren",
    "opapa",
    "operation",
    "operationsbasis",
    "operieren",
    "opfer",
    "opferbereit",
    "opferbereitschaft",
    "opfern",
    "ophthalmologe",
    "opi",
    "opponent",
    "opponentin",
    "opponieren",
    "opportun",
    "opportunismus",
    "opportunistisch",
    "opposition",
    "oppositionell",
    "oppositionswort",
    "oppression",
    "optieren",
    "optimal",
    "optime",
    "optimieren",
    "optimismus",
    "optimistisch",
    "optimum",
    "option",
    "opulent",
    "opulenz",
    "opus",
    "orakel",
    "orakelhaft",
    "orakeln",
    "oral",
    "oratio recta",
    "orator",
    "orchester",
    "orchesterleiter",
    "orchesterleiterin",
    "orchestermusiker",
    "orchestermusikerin",
    "orden",
    "ordensgemeinschaft",
    "ordensmann",
    "ordentlich",
    "order",
    "ordern",
  ]
  const [showWord, setShowWord] = useState(false);
  const [word, setWord] = useState("");
  const [showCircle, setShowCircle] = useState(true);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { size, gl } = useThree();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        if (isMouseInside) {
          const randomWord = oWorter[Math.floor(Math.random() * oWorter.length)];
          setWord(randomWord);
          setCurrentIndex(0);
          setShowWord(true);
          setShowCircle(false);
          
        }
      }
    };
  
    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };
  
    const handleMouseLeave = () => {
      setShowWord(false);
      setShowCircle(true);
      setIsMouseInside(false);
    };
  
    window.addEventListener('keydown', handleKeyDown);
    gl.domElement.addEventListener('mouseenter', handleMouseEnter);
    gl.domElement.addEventListener('mouseleave', handleMouseLeave);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      gl.domElement.removeEventListener('mouseenter', handleMouseEnter);
      gl.domElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl.domElement, oWorter, isMouseInside]);
  

  const [currentLetter, setCurrentLetter] = useState('');

  useEffect(() => {
      let interval;
      if (showWord) {
        setCurrentLetter(word[0]);
  
        let index = 1;
        interval = setInterval(() => {
          if (index < word.length) {
            setCurrentLetter(word[index]);
            index += 1;
          } else {
            clearInterval(interval);
            setShowCircle(true);
            setShowWord(false);
          }
        }, 500); // change this to control the typing speed
      }
  
      return () => clearInterval(interval);
    }, [showWord, word]);

  return (
    <>
      {showWord &&
        <Html position={[0, 0, 0]}>
          <div style={{
            fontFamily: 'AvenirNext-DemiBold',
            fontSize: "17vh",
            left: '-5.3vh',
            top: '-13vh',
            whiteSpace: 'nowrap',
            position: 'absolute',
            color: 'white',
            textAlign: 'center',
            letterSpacing: '-0.2vh',
            pointerEvents: 'none',
            color:'white'

          }}>
            {currentLetter}
          </div>
        </Html>
      }
      {showCircle && (
        <mesh layers={layer}>
          <mesh position={[0, 0, -10]}>
            <planeGeometry args={[size.width / 2, size.height / 2]} />
            <meshBasicMaterial color="black" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <circleGeometry
              args={[1, 64, 2]}
            />
            <meshBasicMaterial color="white" />
          </mesh>
        </mesh>
      )}
    </>
  );
};

export default Scene12;
