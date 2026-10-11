import { PackingCategory } from '../types/packing';

export const PACKING_CATEGORIES: PackingCategory[] = [
  {
    id: 'clothes',
    name: 'Ropa y Calzado',
    items: [
      { id: 'lug-pants-papi', categoryId: 'clothes', text: 'Pantalones - Papi (4)' },
      { id: 'lug-pants-mami', categoryId: 'clothes', text: 'Pantalones - Mami (4)' },
      { id: 'lug-pants-lily', categoryId: 'clothes', text: 'Pantalones - Lily (4)' },
      { id: 'lug-pants-james', categoryId: 'clothes', text: 'Pantalones - James (4)' },
      { id: 'lug-sweaters-papi', categoryId: 'clothes', text: 'Jerséis y Sudaderas - Papi (6)' },
      { id: 'lug-sweaters-mami', categoryId: 'clothes', text: 'Jerséis y Sudaderas - Mami (6)' },
      { id: 'lug-sweaters-lily', categoryId: 'clothes', text: 'Jerséis y Sudaderas - Lily (6)' },
      { id: 'lug-sweaters-james', categoryId: 'clothes', text: 'Jerséis y Sudaderas - James (6)' },
      { id: 'lug-shirts-papi', categoryId: 'clothes', text: 'Camisetas - Papi (6)' },
      { id: 'lug-shirts-mami', categoryId: 'clothes', text: 'Camisetas - Mami (6)' },
      { id: 'lug-shirts-lily', categoryId: 'clothes', text: 'Camisetas - Lily (6)' },
      { id: 'lug-shirts-james', categoryId: 'clothes', text: 'Camisetas - James (6)' },
      { id: 'lug-pajamas-papi', categoryId: 'clothes', text: 'Pijamas - Papi (3)' },
      { id: 'lug-pajamas-mami', categoryId: 'clothes', text: 'Pijamas - Mami (3)' },
      { id: 'lug-pajamas-lily', categoryId: 'clothes', text: 'Pijamas - Lily (3)' },
      { id: 'lug-pajamas-james', categoryId: 'clothes', text: 'Pijamas - James (3)' },
      { id: 'lug-thermal-shirt-papi', categoryId: 'clothes', text: 'Camiseta térmica - Papi' },
      { id: 'lug-thermal-shirt-mami', categoryId: 'clothes', text: 'Camiseta térmica - Mami' },
      { id: 'lug-thermal-shirt-lily', categoryId: 'clothes', text: 'Camiseta térmica - Lily' },
      { id: 'lug-thermal-shirt-james', categoryId: 'clothes', text: 'Camiseta térmica - James' },
      { id: 'lug-thermal-pant-papi', categoryId: 'clothes', text: 'Pantalón térmico - Papi' },
      { id: 'lug-thermal-pant-mami', categoryId: 'clothes', text: 'Pantalón térmico - Mami' },
      { id: 'lug-thermal-pant-lily', categoryId: 'clothes', text: 'Pantalón térmico - Lily' },
      { id: 'lug-thermal-pant-james', categoryId: 'clothes', text: 'Pantalón térmico - James' },
      { id: 'lug-thermal-sock-papi', categoryId: 'clothes', text: 'Calcetines térmicos - Papi' },
      { id: 'lug-thermal-sock-mami', categoryId: 'clothes', text: 'Calcetines térmicos - Mami' },
      { id: 'lug-thermal-sock-lily', categoryId: 'clothes', text: 'Calcetines térmicos - Lily' },
      { id: 'lug-thermal-sock-james', categoryId: 'clothes', text: 'Calcetines térmicos - James' },
      { id: 'lug-coat-papi', categoryId: 'clothes', text: 'Chaquetón / Abrigo - Papi' },
      { id: 'lug-coat-mami', categoryId: 'clothes', text: 'Chaquetón / Abrigo - Mami' },
      { id: 'lug-coat-lily', categoryId: 'clothes', text: 'Chaquetón / Abrigo - Lily' },
      { id: 'lug-coat-james', categoryId: 'clothes', text: 'Chaquetón / Abrigo - James' },
      { id: 'lug-hat-papi', categoryId: 'clothes', text: 'Gorro - Papi' },
      { id: 'lug-hat-mami', categoryId: 'clothes', text: 'Gorro - Mami' },
      { id: 'lug-hat-lily', categoryId: 'clothes', text: 'Gorro - Lily' },
      { id: 'lug-hat-james', categoryId: 'clothes', text: 'Gorro - James' },
      { id: 'lug-scarf-papi', categoryId: 'clothes', text: 'Bufanda - Papi' },
      { id: 'lug-scarf-mami', categoryId: 'clothes', text: 'Bufanda - Mami' },
      { id: 'lug-scarf-lily', categoryId: 'clothes', text: 'Bufanda - Lily' },
      { id: 'lug-scarf-james', categoryId: 'clothes', text: 'Bufanda - James' },
      { id: 'lug-gloves-papi', categoryId: 'clothes', text: 'Guantes - Papi' },
      { id: 'lug-gloves-mami', categoryId: 'clothes', text: 'Guantes - Mami' },
      { id: 'lug-gloves-lily', categoryId: 'clothes', text: 'Guantes - Lily' },
      { id: 'lug-gloves-james', categoryId: 'clothes', text: 'Guantes - James' },
      { id: 'lug-boots-papi', categoryId: 'clothes', text: 'Botas de invierno - Papi' },
      { id: 'lug-boots-mami', categoryId: 'clothes', text: 'Botas de invierno - Mami' },
      { id: 'lug-boots-lily', categoryId: 'clothes', text: 'Botas de invierno - Lily' },
      { id: 'lug-boots-james', categoryId: 'clothes', text: 'Botas de invierno - James' },
      { id: 'lug-socks-norm-papi', categoryId: 'clothes', text: 'Calcetines normales (6 pares) - Papi' },
      { id: 'lug-socks-norm-mami', categoryId: 'clothes', text: 'Calcetines normales (6 pares) - Mami' },
      { id: 'lug-socks-norm-lily', categoryId: 'clothes', text: 'Calcetines normales (6 pares) - Lily' },
      { id: 'lug-socks-norm-james', categoryId: 'clothes', text: 'Calcetines normales (6 pares) - James' },
      { id: 'lug-underwear-papi', categoryId: 'clothes', text: 'Ropa interior / Calzones - Papi (20)' },
      { id: 'lug-underwear-mami', categoryId: 'clothes', text: 'Ropa interior / Calzones - Mami (22)' },
      { id: 'lug-underwear-lily', categoryId: 'clothes', text: 'Ropa interior / Calzones - Lily (22)' },
      { id: 'lug-underwear-james', categoryId: 'clothes', text: 'Ropa interior / Calzones - James (20)' }
    ]
  },
  {
    id: 'hygiene',
    name: 'Neceser e Higiene',
    items: [
      { id: 'lug-hyg-salvaslips', categoryId: 'hygiene', text: 'Salvaslips' },
      { id: 'lug-hyg-tampones', categoryId: 'hygiene', text: 'Tampones' },
      { id: 'lug-hyg-compresas', categoryId: 'hygiene', text: 'Compresas' },
      { id: 'lug-hyg-toallitas', categoryId: 'hygiene', text: 'Toallitas húmedas' },
      { id: 'lug-hyg-toallas', categoryId: 'hygiene', text: '2 toallas pequeñas' },
      { id: 'lug-hyg-desinfectante', categoryId: 'hygiene', text: 'Desinfectante de manos' },
      { id: 'lug-hyg-cepillos', categoryId: 'hygiene', text: 'Cepillos de dientes' },
      { id: 'lug-hyg-pasta', categoryId: 'hygiene', text: 'Pasta de dientes' },
      { id: 'lug-hyg-peine', categoryId: 'hygiene', text: 'Peine / Cepillo' },
      { id: 'lug-hyg-crema-james', categoryId: 'hygiene', text: 'Crema de cara (James)' },
      { id: 'lug-hyg-nivea', categoryId: 'hygiene', text: 'Crema Nivea (Multiusos)' },
      { id: 'lug-hyg-termometro', categoryId: 'hygiene', text: 'Termómetro' },
      { id: 'lug-hyg-cuchilla', categoryId: 'hygiene', text: 'Cuchilla de afeitar / depilar' }
    ]
  },
  {
    id: 'documentation',
    name: 'Documentación y Gestión',
    items: [
      { id: 'lug-doc-pasaportes', categoryId: 'documentation', text: 'Pasaportes' },
      { id: 'lug-doc-vjw', categoryId: 'documentation', text: 'Códigos QR de Visit Japan Web (Inmigración y Aduanas)' },
      { id: 'lug-doc-seguros', categoryId: 'documentation', text: 'Seguros de viaje' },
      { id: 'lug-doc-copias', categoryId: 'documentation', text: 'Copias digitales de documentos' }
    ]
  },
  {
    id: 'electronics',
    name: 'Conectividad y Electrónica',
    items: [
      { id: 'lug-elec-wifi', categoryId: 'electronics', text: 'Pocket Wi-Fi o eSIM de datos' },
      { id: 'lug-elec-adaptador', categoryId: 'electronics', text: 'Adaptadores de enchufe Tipo A (Clavija plana)' },
      { id: 'lug-elec-powerbank', categoryId: 'electronics', text: 'Powerbank (Batería externa de alta capacidad) x2' },
      { id: 'lug-elec-cargadores', categoryId: 'electronics', text: 'Cargadores y cables (Móviles, Tablets, Auriculares)' }
    ]
  },
  {
    id: 'money',
    name: 'Dinero y Transporte',
    items: [
      { id: 'lug-money-suica', categoryId: 'money', text: 'Tarjetas Suica / Pasmo (Configuradas en Wallet o Físicas)' },
      { id: 'lug-money-revolut', categoryId: 'money', text: 'Revolut cargada' }
    ]
  },
  {
    id: 'botiquin',
    name: 'Botiquín e Higiene Infantil',
    items: [
      { id: 'lug-med-apiretal', categoryId: 'botiquin', text: 'Apiretal / Dalsy / Ibuprofeno infantil' },
      { id: 'lug-med-tiritas', categoryId: 'botiquin', text: 'Tiritas y apósitos anti-rozaduras' },
      { id: 'lug-med-antihistaminicos', categoryId: 'botiquin', text: 'Antihistamínicos y medicación habitual' },
      { id: 'lug-med-balsamo', categoryId: 'botiquin', text: 'Bálsamo labial e hidratante intensiva (Frío seco)' },
      { id: 'lug-med-crema-cuerpo', categoryId: 'botiquin', text: 'Crema hidratante corporal' },
      { id: 'lug-med-spray', categoryId: 'botiquin', text: 'Spray nasal' },
      { id: 'lug-med-mascarillas', categoryId: 'botiquin', text: 'Mascarillas' },
      { id: 'lug-med-caramelos', categoryId: 'botiquin', text: 'Caramelos para la garganta' }
    ]
  },
  {
    id: 'logistics',
    name: 'Logística y Confort de Viaje',
    items: [
      { id: 'lug-log-mochila', categoryId: 'logistics', text: 'Mochila ligera (Uso diario)' },
      { id: 'lug-log-entretenimiento', categoryId: 'logistics', text: 'Entretenimiento para el vuelo (Tablets, Switch, Auriculares, Cuadernos)' },
      { id: 'lug-log-bolsas-extra', categoryId: 'logistics', text: 'Bolsas plegables / Mochila extra (Para compras y souvenirs)' },
      { id: 'lug-log-canguro', categoryId: 'logistics', text: 'Canguro James' },
      { id: 'lug-log-ziplock', categoryId: 'logistics', text: 'Bolsas Zip plástico' },
      { id: 'lug-log-monedero', categoryId: 'logistics', text: 'Monedero' },
      { id: 'lug-log-manta', categoryId: 'logistics', text: 'Manta pequeña' },
      { id: 'lug-log-palillos', categoryId: 'logistics', text: 'Adaptadores palillos' }
    ]
  },
  {
    id: 'shopping',
    name: 'Compras Previaje',
    items: [
      { id: 'lug-buy-calcetines', categoryId: 'shopping', text: 'Calcetines térmicos Papito' },
      { id: 'lug-buy-botas-lily', categoryId: 'shopping', text: 'Botas Lily' },
      { id: 'lug-buy-botas-james', categoryId: 'shopping', text: 'Botas James' },
      { id: 'lug-buy-canguro', categoryId: 'shopping', text: 'Canguro James' },
      { id: 'lug-buy-monedero', categoryId: 'shopping', text: 'Monedero' },
      { id: 'lug-buy-manta', categoryId: 'shopping', text: 'Manta pequeña' }
    ]
  }
];
