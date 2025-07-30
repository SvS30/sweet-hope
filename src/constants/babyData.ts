const babySize = {
    1: { item: 'semilla de amapola', emoji: '🌱', size: '1mm' },
    2: { item: 'semilla de sésamo', emoji: '🫘', size: '2mm' },
    3: { item: 'semilla de chía', emoji: '🌰', size: '3mm' },
    4: { item: 'semilla de girasol', emoji: '🌻', size: '5mm' },
    5: { item: 'pepita de manzana', emoji: '🍎', size: '8mm' },
    6: { item: 'lenteja', emoji: '🫘', size: '1.2cm' },
    7: { item: 'arándano', emoji: '🫐', size: '1.5cm' },
    8: { item: 'frijol', emoji: '🫘', size: '2cm' },
    9: { item: 'uva', emoji: '🍇', size: '2.5cm' },
    10: { item: 'fresa', emoji: '🍓', size: '3.5cm' },
    11: { item: 'lima', emoji: '🟢', size: '4.5cm' },
    12: { item: 'ciruela', emoji: '🟣', size: '6cm' },
    13: { item: 'durazno', emoji: '🍑', size: '7.5cm' },
    14: { item: 'limón', emoji: '🍋', size: '9cm' },
    15: { item: 'naranja', emoji: '🍊', size: '10cm' },
    16: { item: 'aguacate', emoji: '🥑', size: '12cm' },
    17: { item: 'pera', emoji: '🍐', size: '13cm' },
    18: { item: 'pimiento', emoji: '🫑', size: '14cm' },
    19: { item: 'mango', emoji: '🥭', size: '15cm' },
    20: { item: 'plátano', emoji: '🍌', size: '16.5cm' },
    21: { item: 'zanahoria', emoji: '🥕', size: '18cm' },
    22: { item: 'calabacín', emoji: '🥒', size: '19cm' },
    23: { item: 'elote', emoji: '🌽', size: '20cm' },
    24: { item: 'berenjena', emoji: '🍆', size: '21cm' },
    25: { item: 'coliflor', emoji: '🥦', size: '22cm' },
    26: { item: 'lechuga', emoji: '🥬', size: '23cm' },
    27: { item: 'brócoli', emoji: '🥦', size: '24cm' },
    28: { item: 'pepino', emoji: '🥒', size: '25cm' },
    29: { item: 'calabaza pequeña', emoji: '🎃', size: '26cm' },
    30: { item: 'repollo', emoji: '🥬', size: '27cm' },
    31: { item: 'coco', emoji: '🥥', size: '28cm' },
    32: { item: 'jícama', emoji: '🥔', size: '29cm' },
    33: { item: 'piña baby', emoji: '🍍', size: '30cm' },
    34: { item: 'melón cantaloupe', emoji: '🍈', size: '32cm' },
    35: { item: 'melón', emoji: '🍈', size: '33cm' },
    36: { item: 'papaya', emoji: '🥭', size: '34cm' },
    37: { item: 'sandía pequeña', emoji: '🍉', size: '35cm' },
    38: { item: 'calabaza mediana', emoji: '🎃', size: '36cm' },
    39: { item: 'sandía', emoji: '🍉', size: '37cm' },
    40: { item: 'calabaza grande', emoji: '🎃', size: '38cm' },
};

const weeklyDevelopment = {
    1: {
        title: 'El comienzo mágico',
        developments: ['Implantación en el útero', 'Formación del saco gestacional', 'Inicio de la producción de HCG'],
        milestones: ['Tu cuerpo comienza a prepararse para el embarazo']
    },
    4: {
        title: 'El corazón late',
        developments: ['El corazón comienza a latir', 'Formación del tubo neural', 'Aparecen las yemas de brazos y piernas'],
        milestones: ['Primer latido del corazón', 'Sistema nervioso en desarrollo']
    },
    8: {
        title: 'Tomando forma humana',
        developments: ['Formación de dedos de manos y pies', 'Desarrollo de rasgos faciales', 'Movimientos espontáneos'],
        milestones: ['Parece más un bebé', 'Órganos principales en desarrollo']
    },
    12: {
        title: 'Fin del primer trimestre',
        developments: ['Todos los órganos están formados', 'Puede mover brazos y piernas', 'Desarrollo de uñas'],
        milestones: ['Riesgo de aborto espontáneo disminuye', 'Náuseas suelen mejorar']
    },
    16: {
        title: 'Crecimiento acelerado',
        developments: ['Desarrollo del sistema auditivo', 'Movimientos más coordinados', 'Crecimiento rápido'],
        milestones: ['Podrías sentir los primeros movimientos', 'Es posible conocer el sexo']
    },
    20: {
        title: 'Mitad del camino',
        developments: ['Desarrollo de huellas dactilares', 'Cabello y cejas creciendo', 'Puede escuchar sonidos'],
        milestones: ['Ecografía de anatomía fetal', 'Movimientos más evidentes']
    },
    24: {
        title: 'Viabilidad extrauterina',
        developments: ['Pulmones en desarrollo', 'Respuestas a sonidos', 'Ciclos de sueño regulares'],
        milestones: ['Podría sobrevivir fuera del útero con cuidados intensivos']
    },
    28: {
        title: 'Tercer trimestre',
        developments: ['Apertura de los ojos', 'Desarrollo del tejido cerebral', 'Movimientos más fuertes'],
        milestones: ['Mayor probabilidad de supervivencia', 'Desarrollo pulmonar avanzado']
    },
    32: {
        title: 'Preparándose para nacer',
        developments: ['Acumulación de grasa', 'Uñas completamente desarrolladas', 'Posición para el parto'],
        milestones: ['Menor riesgo de complicaciones si nace']
    },
    36: {
        title: 'Casi listo',
        developments: ['Pulmones casi maduros', 'Descenso hacia la pelvis', 'Sistema inmune desarrollándose'],
        milestones: ['Considerado término temprano', 'Preparación para la lactancia']
    },
    40: {
        title: '¡Momento del encuentro!',
        developments: ['Completamente desarrollado', 'Listo para la vida extrauterina', 'En posición para nacer'],
        milestones: ['Fecha probable de parto', '¡Es hora de conocerse!']
    }
};

const growthData = [
    { week: 8, length: 1.6, weight: 1 },
    { week: 12, length: 5.4, weight: 14 },
    { week: 16, length: 11.6, weight: 100 },
    { week: 20, length: 16.4, weight: 300 },
    { week: 24, length: 21.3, weight: 600 },
    { week: 28, length: 25.4, weight: 1000 },
    { week: 32, length: 28.9, weight: 1700 },
    { week: 36, length: 32.3, weight: 2600 },
    { week: 40, length: 35.6, weight: 3400 },
];

export { babySize, weeklyDevelopment, growthData };