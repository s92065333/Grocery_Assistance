import type { PurchaseHistoryItem, GroceryItem } from './types';

// Default rules (server-safe, used when localStorage is not available)
export const DEFAULT_HEALTHIER_ALTERNATIVES: Record<string, string> = {
  // Bread and grains
  'white bread': 'brown bread',
  'white rice': 'brown rice',
  'samba rice': 'red rice',
  'basmati rice': 'brown rice',
  'jasmine rice': 'brown rice',
  'white flour': 'whole wheat flour',
  'all purpose flour': 'whole wheat flour',
  'maida': 'whole wheat flour',
  'pasta': 'whole wheat pasta',
  'noodles': 'whole wheat noodles',
  
  // Dairy products
  'full cream milk': 'low-fat milk',
  'whole milk': 'low-fat milk',
  'full fat yogurt': 'low-fat yogurt',
  'cream': 'low-fat cream',
  'butter': 'olive oil',
  'ghee': 'coconut oil',
  'margarine': 'olive oil',
  
  // Beverages
  'soda': 'sparkling water',
  'cola': 'sparkling water',
  'soft drinks': 'fresh fruit juice',
  'packaged juice': 'fresh fruit juice',
  'energy drinks': 'coconut water',
  'sweetened tea': 'unsweetened tea',
  'sweetened coffee': 'unsweetened coffee',
  
  // Sweeteners and condiments
  'sugar': 'honey',
  'white sugar': 'jaggery',
  'refined sugar': 'palm sugar',
  'mayonnaise': 'greek yogurt',
  'sour cream': 'greek yogurt',
  'cream cheese': 'cottage cheese',
  
  // Snacks and desserts
  'potato chips': 'baked chips',
  'fried snacks': 'roasted nuts',
  'ice cream': 'frozen yogurt',
  'candy': 'dried fruits',
  'chocolates': 'dark chocolate',
  'cookies': 'oatmeal cookies',
  'biscuits': 'whole grain crackers',
  
  // Oils and fats
  'vegetable oil': 'coconut oil',
  'sunflower oil': 'coconut oil',
  'palm oil': 'coconut oil',
  'refined oil': 'virgin coconut oil',
  
  // Sri Lankan specific healthier alternatives
  'white parboiled rice': 'red rice',
  'polished rice': 'unpolished rice',
  'coconut oil (refined)': 'virgin coconut oil',
  'packaged coconut milk': 'fresh coconut milk',
  'instant curry powder': 'fresh ground spices',
  'packaged sambol': 'fresh sambol',
  'fried hoppers': 'steamed hoppers',
  'fried roti': 'steamed roti',
  'fried string hoppers': 'steamed string hoppers',
  'white sugar (for tea)': 'jaggery',
  'refined salt': 'rock salt',
  
  // Meat and protein
  'red meat': 'fish',
  'pork': 'chicken',
  'beef': 'fish',
  'processed meat': 'fresh fish',
  'canned fish': 'fresh fish',
  
  // Vegetables (Sri Lankan)
  'fried vegetables': 'steamed vegetables',
  'canned vegetables': 'fresh vegetables',
  'fried brinjal': 'steamed brinjal',
  'fried okra': 'steamed okra',
  'fried potatoes': 'baked potatoes',
  
  // More grains and cereals
  'white quinoa': 'brown quinoa',
  'refined semolina': 'whole wheat semolina',
  'white corn': 'yellow corn',
  'instant oats': 'rolled oats',
  'refined barley': 'whole barley',
  
  // More Sri Lankan rice varieties
  'keeri samba': 'red rice',
  'sudu kekulu': 'red rice',
  'nadu': 'red rice',
  
  // More beverages
  'artificial juice': 'fresh fruit juice',
  'concentrated juice': 'fresh fruit juice',
  'sweetened coconut water': 'fresh coconut water',
  'packaged tea': 'loose leaf tea',
  'instant coffee': 'ground coffee',
  '3-in-1 coffee': 'black coffee',
  
  // More snacks
  'fried cashews': 'roasted cashews',
  'salted peanuts': 'unsalted peanuts',
  'fried gram': 'roasted gram',
  'murukku': 'baked murukku',
  'achcharu': 'fresh fruits',
  'seeni sambol': 'fresh coconut sambol',
  
  // More condiments
  'artificial sweetener': 'stevia',
  'table salt': 'sea salt',
  'iodized salt': 'rock salt',
  'white vinegar': 'apple cider vinegar',
  'soy sauce (regular)': 'low sodium soy sauce',
  'ketchup': 'homemade tomato sauce',
  
  // More dairy alternatives
  'condensed milk': 'low-fat milk',
  'evaporated milk': 'low-fat milk',
  'sweetened yogurt': 'plain yogurt',
  'flavored yogurt': 'plain yogurt with fruits',
  
  // More Sri Lankan sweets
  'kavum': 'fresh fruits',
  'kokis': 'baked kokis',
  'aluwa': 'dried fruits',
  'wattalappam': 'fresh fruits',
  
  // More vegetables
  'fried bitter gourd': 'steamed bitter gourd',
  'fried ridge gourd': 'steamed ridge gourd',
  'fried ash plantain': 'steamed ash plantain',
  'fried breadfruit': 'steamed breadfruit',
  'fried jackfruit': 'fresh jackfruit',
  
  // More protein sources
  'sausages': 'grilled chicken',
  'bacon': 'turkey bacon',
  'hot dogs': 'grilled fish',
  'luncheon meat': 'fresh fish',
  'canned meat': 'fresh meat',
  
  // More cooking methods
  'deep fried food': 'baked food',
  'fried rice': 'steamed rice',
  'fried noodles': 'steamed noodles',
  'fried chicken': 'grilled chicken',
  'fried fish': 'baked fish',
  'fried eggs': 'poached eggs',
  'fried tofu': 'baked tofu',
  
  // More bread and bakery items
  'white buns': 'whole wheat buns',
  'croissants': 'whole grain bread',
  'doughnuts': 'whole grain muffins',
  'white cake': 'whole wheat cake',
  'white pizza base': 'whole wheat pizza base',
  'naan': 'whole wheat roti',
  'paratha': 'whole wheat roti',
  'puri': 'whole wheat roti',
  'fried bread': 'toasted whole wheat bread',
  
  // More rice and grain alternatives
  'sticky rice': 'brown rice',
  'glutinous rice': 'brown rice',
  'arborio rice': 'brown rice',
  'risotto rice': 'brown rice',
  'sushi rice': 'brown rice',
  'white couscous': 'whole wheat couscous',
  'white bulgur': 'whole wheat bulgur',
  'refined cornmeal': 'whole grain cornmeal',
  'white polenta': 'whole grain polenta',
  
  // More dairy and dairy alternatives
  'heavy cream': 'light cream',
  'whipping cream': 'low-fat cream',
  'sour cream (full fat)': 'low-fat sour cream',
  'cream cheese (full fat)': 'low-fat cream cheese',
  'ricotta (full fat)': 'low-fat ricotta',
  'mascarpone': 'low-fat cream cheese',
  'full fat cheese': 'low-fat cheese',
  'processed cheese': 'natural cheese',
  'cheese slices': 'natural cheese',
  'cheese spread': 'cottage cheese',
  'butter (for cooking)': 'olive oil',
  'clarified butter': 'coconut oil',
  
  // More beverages
  'fruit punch': 'fresh fruit juice',
  'sports drinks': 'coconut water',
  'vitamin water': 'plain water with lemon',
  'flavored water': 'plain water',
  'sweet tea': 'unsweetened herbal tea',
  'iced coffee (sweetened)': 'black iced coffee',
  'frappuccino': 'black coffee',
  'hot chocolate': 'dark chocolate with milk',
  'chocolate milk': 'low-fat milk with cocoa',
  'milkshake': 'smoothie',
  'smoothie (with sugar)': 'fresh fruit smoothie',
  'alcoholic beverages': 'sparkling water with lime',
  'beer': 'light beer or sparkling water',
  'wine': 'sparkling water',
  'cocktails': 'fresh fruit mocktails',
  
  // More sweeteners
  'brown sugar': 'jaggery',
  'powdered sugar': 'honey',
  'corn syrup': 'maple syrup',
  'high fructose corn syrup': 'honey',
  'artificial sugar': 'stevia',
  'sucralose': 'stevia',
  'aspartame': 'stevia',
  'saccharin': 'stevia',
  'agave nectar': 'raw honey',
  'golden syrup': 'maple syrup',
  
  // More snacks and treats
  'chips': 'baked vegetable chips',
  'nachos': 'baked tortilla chips',
  'pretzels': 'whole grain pretzels',
  'crackers': 'whole grain crackers',
  'rice cakes': 'whole grain rice cakes',
  'popcorn (buttered)': 'air-popped popcorn',
  'microwave popcorn': 'air-popped popcorn',
  'granola bars (sweetened)': 'homemade granola bars',
  'energy bars': 'nuts and dried fruits',
  'protein bars (processed)': 'natural protein sources',
  'candy bars': 'dark chocolate',
  'marshmallows': 'dried fruits',
  'gummy candies': 'dried fruits',
  'lollipops': 'frozen fruits',
  'cotton candy': 'fresh fruits',
  'donuts': 'whole grain muffins',
  'cupcakes': 'fruit-based desserts',
  'pastries': 'whole grain pastries',
  'pie (sweet)': 'fruit salad',
  'cheesecake': 'greek yogurt with fruits',
  'pudding': 'chia seed pudding',
  'gelatin': 'agar agar',
  'jello': 'fresh fruit jelly',
  
  // More Sri Lankan snacks
  'fried vadai': 'baked vadai',
  'fried cutlet': 'baked cutlet',
  'fried samosa': 'baked samosa',
  'fried bonda': 'baked bonda',
  'fried rolls': 'baked rolls',
  'fried kavum': 'baked kavum',
  'fried kokis': 'baked kokis',
  'fried aasmi': 'baked aasmi',
  'fried mung kewum': 'baked mung kewum',
  'fried aluwa': 'dried fruits',
  'fried murukku': 'baked murukku',
  'fried sev': 'baked sev',
  'fried mixture': 'roasted nuts mixture',
  'fried peanuts': 'roasted peanuts',
  'fried almonds': 'roasted almonds',
  
  // More condiments and sauces
  'ranch dressing': 'greek yogurt dressing',
  'caesar dressing': 'olive oil and lemon',
  'thousand island': 'greek yogurt sauce',
  'blue cheese dressing': 'vinaigrette',
  'honey mustard': 'dijon mustard',
  'sweet and sour sauce': 'homemade sauce',
  'teriyaki sauce (sweetened)': 'low sodium teriyaki',
  'hoisin sauce (sweetened)': 'low sodium hoisin',
  'sriracha (sweetened)': 'fresh chili sauce',
  'ketchup (high sugar)': 'homemade tomato sauce',
  'barbecue sauce (sweetened)': 'homemade bbq sauce',
  'marinara sauce (sweetened)': 'homemade tomato sauce',
  'alfredo sauce': 'light cream sauce',
  'hollandaise sauce': 'light hollandaise',
  'tartar sauce': 'greek yogurt sauce',
  'cocktail sauce': 'homemade sauce',
  'remoulade': 'greek yogurt sauce',
  
  // More oils and cooking fats
  'canola oil': 'olive oil',
  'corn oil': 'olive oil',
  'soybean oil': 'olive oil',
  'peanut oil': 'coconut oil',
  'sesame oil (refined)': 'virgin sesame oil',
  'grapeseed oil': 'olive oil',
  'safflower oil': 'olive oil',
  'cottonseed oil': 'coconut oil',
  'hydrogenated oil': 'virgin coconut oil',
  'partially hydrogenated oil': 'virgin coconut oil',
  'trans fat': 'healthy fats',
  'shortening': 'coconut oil',
  'lard': 'coconut oil',
  
  // More protein alternatives
  'ground beef': 'ground turkey',
  'beef steak': 'fish steak',
  'pork chops': 'chicken breast',
  'lamb': 'chicken',
  'duck': 'chicken',
  'goat meat': 'chicken',
  'processed chicken': 'fresh chicken',
  'chicken nuggets': 'grilled chicken strips',
  'chicken fingers': 'grilled chicken',
  'breaded chicken': 'grilled chicken',
  'canned chicken': 'fresh chicken',
  'canned tuna (in oil)': 'fresh tuna',
  'canned salmon (in oil)': 'fresh salmon',
  'smoked fish': 'fresh fish',
  'salted fish': 'fresh fish',
  'dried fish (salted)': 'fresh fish',
  'fish sticks': 'fresh fish fillets',
  'crab sticks': 'fresh crab',
  'imitation crab': 'fresh seafood',
  'shrimp (frozen processed)': 'fresh shrimp',
  'tofu (fried)': 'baked tofu',
  'tempeh (fried)': 'steamed tempeh',
  'seitan': 'tofu',
  'protein powder (artificial)': 'natural protein sources',
  
  // More vegetables and preparation methods
  'canned beans': 'fresh beans',
  'canned corn': 'fresh corn',
  'canned peas': 'fresh peas',
  'canned mushrooms': 'fresh mushrooms',
  'canned asparagus': 'fresh asparagus',
  'canned artichokes': 'fresh artichokes',
  'canned olives': 'fresh olives',
  'pickled vegetables': 'fresh vegetables',
  'sauerkraut (processed)': 'fresh fermented vegetables',
  'fried mushrooms': 'grilled mushrooms',
  'fried onions': 'caramelized onions',
  'fried zucchini': 'grilled zucchini',
  'fried eggplant': 'baked eggplant',
  'fried cauliflower': 'roasted cauliflower',
  'fried broccoli': 'steamed broccoli',
  'fried green beans': 'steamed green beans',
  'fried asparagus': 'grilled asparagus',
  'fried corn': 'boiled corn',
  'creamed vegetables': 'steamed vegetables',
  'buttered vegetables': 'steamed vegetables with herbs',
  
  // More Sri Lankan vegetable preparations
  'fried gotukola': 'fresh gotukola salad',
  'fried kankun': 'steamed kankun',
  'fried mukunuwenna': 'fresh mukunuwenna salad',
  'fried thampala': 'steamed thampala',
  'fried kohila': 'steamed kohila',
  'fried nivithi': 'steamed nivithi',
  'fried brinjal curry': 'steamed brinjal curry',
  'fried okra curry': 'steamed okra curry',
  'fried bitter gourd curry': 'steamed bitter gourd curry',
  'fried ridge gourd curry': 'steamed ridge gourd curry',
  'fried ash plantain curry': 'steamed ash plantain curry',
  'fried breadfruit curry': 'steamed breadfruit curry',
  'fried jackfruit curry': 'fresh jackfruit curry',
  'fried pumpkin curry': 'steamed pumpkin curry',
  'fried snake gourd curry': 'steamed snake gourd curry',
  'fried drumsticks curry': 'steamed drumsticks curry',
  
  // More fruits and fruit products
  'canned fruits (in syrup)': 'fresh fruits',
  'fruit cocktail (canned)': 'fresh fruit salad',
  'dried fruits (sweetened)': 'unsweetened dried fruits',
  'candied fruits': 'fresh fruits',
  'fruit preserves (high sugar)': 'low sugar preserves',
  'fruit jam (high sugar)': 'low sugar jam',
  'fruit jelly (high sugar)': 'low sugar jelly',
  'fruit syrup': 'fresh fruit',
  'fruit concentrate': 'fresh fruit',
  'fruit puree (sweetened)': 'fresh fruit puree',
  'fruit juice (from concentrate)': 'fresh fruit juice',
  'fruit nectar': 'fresh fruit juice',
  'smoothie (with added sugar)': 'fresh fruit smoothie',
  'frozen fruits (sweetened)': 'fresh fruits',
  
  // More breakfast items
  'sugary cereals': 'whole grain cereals',
  'frosted flakes': 'plain cornflakes',
  'honey nut cereals': 'plain whole grain cereals',
  'chocolate cereals': 'whole grain cereals',
  'sweetened oatmeal': 'plain oatmeal with fruits',
  'instant oatmeal (sweetened)': 'rolled oats with fruits',
  'pancakes (white flour)': 'whole wheat pancakes',
  'waffles (white flour)': 'whole wheat waffles',
  'french toast (white bread)': 'whole wheat french toast',
  'breakfast pastries': 'whole grain muffins',
  'danish pastries': 'whole grain muffins',
  'breakfast bars (sweetened)': 'homemade granola bars',
  'toaster pastries': 'whole grain toast with fruits',
  
  // More Sri Lankan breakfast items
  'fried thosai': 'plain thosai',
  'fried iddli': 'steamed iddli',
  'fried pittu': 'steamed pittu',
  'fried appam': 'plain appam',
  'fried kiribath': 'plain kiribath',
  
  // More desserts and sweets
  'cheesecake (full fat)': 'low-fat cheesecake',
  'ice cream (full fat)': 'frozen yogurt',
  'gelato': 'sorbet',
  'sorbet (sweetened)': 'fresh fruit sorbet',
  'frozen yogurt (sweetened)': 'plain frozen yogurt',
  'custard (sweetened)': 'chia seed pudding',
  'flan': 'chia seed pudding',
  'creme brulee': 'greek yogurt with fruits',
  'tiramisu': 'coffee-flavored yogurt',
  'mousse': 'whipped greek yogurt',
  'panna cotta': 'greek yogurt panna cotta',
  'trifle': 'fruit salad with yogurt',
  'bread pudding': 'whole grain bread pudding',
  'rice pudding (sweetened)': 'brown rice pudding',
  'semolina pudding': 'whole grain semolina pudding',
  
  // More Sri Lankan desserts
  'wattalappam (high sugar)': 'low sugar wattalappam',
  'kiri pani (sweetened)': 'low sugar kiri pani',
  'kalu dodol (high sugar)': 'low sugar kalu dodol',
  'mun kewum (sweetened)': 'low sugar mun kewum',
  'aasmi (sweetened)': 'low sugar aasmi',
  'kavum (fried)': 'baked kavum',
  'kokis (fried)': 'baked kokis',
  'aluwa (high sugar)': 'low sugar aluwa',
  'thala guli (sweetened)': 'low sugar thala guli',
  'kevum (fried)': 'baked kevum',
  
  // More processed foods
  'instant noodles': 'whole wheat noodles',
  'ramen noodles': 'whole wheat noodles',
  'cup noodles': 'homemade soup',
  'frozen meals': 'fresh cooked meals',
  'microwave meals': 'fresh cooked meals',
  'tv dinners': 'fresh cooked meals',
  'frozen pizza': 'homemade pizza',
  'frozen burgers': 'homemade burgers',
  'frozen fries': 'baked sweet potato fries',
  'frozen chicken nuggets': 'grilled chicken',
  'frozen fish sticks': 'fresh fish',
  'frozen vegetables (with sauce)': 'fresh vegetables',
  'canned soup': 'homemade soup',
  'instant soup': 'homemade soup',
  'bouillon cubes': 'homemade stock',
  'instant gravy': 'homemade gravy',
  'packaged curry': 'homemade curry',
  'instant curry': 'fresh curry',
  'ready-made meals': 'fresh cooked meals',
  
  // More Sri Lankan processed items
  'instant hoppers mix': 'fresh hoppers',
  'instant string hoppers mix': 'fresh string hoppers',
  'instant roti mix': 'fresh roti',
  'packaged curry paste': 'fresh ground spices',
  'instant dhal': 'fresh dhal',
  'canned sambol': 'fresh sambol',
  'packaged lunumiris': 'fresh lunumiris',
  'instant coconut sambol': 'fresh coconut sambol',
  
  // More beverages (alcoholic and non-alcoholic)
  'soda pop': 'sparkling water',
  'tonic water': 'sparkling water',
  'club soda (sweetened)': 'plain club soda',
  'lemonade (sweetened)': 'fresh lemon water',
  'iced tea (sweetened)': 'unsweetened iced tea',
  'bubble tea': 'fresh fruit tea',
  'slushies': 'frozen fruit smoothie',
  'frozen drinks': 'fresh fruit drinks',
  'energy shots': 'natural energy sources',
  'protein shakes (sweetened)': 'natural protein sources',
  'meal replacement shakes': 'balanced meals',
  
  // More condiments and seasonings
  'seasoning salt': 'herbs and spices',
  'garlic salt': 'fresh garlic',
  'onion salt': 'fresh onions',
  'celery salt': 'fresh celery',
  'msg': 'natural flavor enhancers',
  'artificial flavoring': 'natural flavors',
  'artificial coloring': 'natural colors',
  'preservatives': 'fresh ingredients',
  'sodium-rich seasonings': 'herbs and spices',
  
  // More spreads and dips
  'nutella': 'almond butter',
  'chocolate spread': 'dark chocolate spread',
  'peanut butter (sweetened)': 'natural peanut butter',
  'almond butter (sweetened)': 'natural almond butter',
  'cashew butter (sweetened)': 'natural cashew butter',
  'honey butter': 'natural honey',
  'garlic butter': 'olive oil with garlic',
  'herb butter': 'olive oil with herbs',
  'cream cheese spread': 'cottage cheese',
  'cheese dip': 'greek yogurt dip',
  'sour cream dip': 'greek yogurt dip',
  'ranch dip': 'greek yogurt dip',
  'onion dip': 'greek yogurt dip',
  
  // More baking ingredients
  'white chocolate': 'dark chocolate',
  'milk chocolate': 'dark chocolate',
  'chocolate chips (milk)': 'dark chocolate chips',
  'chocolate syrup': 'cocoa powder',
  'caramel sauce': 'date syrup',
  'butterscotch': 'natural sweeteners',
  'frosting': 'whipped greek yogurt',
  'icing': 'natural fruit glaze',
  'fondant': 'natural fruit decorations',
  
  // More grains and starches
  'white potatoes': 'sweet potatoes',
  'mashed potatoes (buttered)': 'mashed sweet potatoes',
  'french fries': 'baked sweet potato fries',
  'hash browns (fried)': 'baked hash browns',
  'tater tots': 'baked sweet potato tots',
  'white breadcrumbs': 'whole wheat breadcrumbs',
  'panko (white)': 'whole wheat panko',
  
  // More Sri Lankan grains
  'white samba rice': 'red samba rice',
  'white nadu': 'red nadu',
  'white kekulu': 'red kekulu',
  'white ma wee': 'red ma wee',
  'polished kuruluthuda': 'unpolished kuruluthuda',
  
  // More legumes and beans
  'refried beans (canned)': 'fresh cooked beans',
  'baked beans (sweetened)': 'fresh cooked beans',
  'canned beans (with salt)': 'fresh cooked beans',
  'bean dip (processed)': 'homemade bean dip',
  'hummus (store-bought sweetened)': 'homemade hummus',
  
  // More nuts and seeds
  'honey roasted nuts': 'raw nuts',
  'sugar coated nuts': 'raw nuts',
  'salted nuts (high sodium)': 'unsalted nuts',
  'candied nuts': 'raw nuts',
  'chocolate covered nuts': 'raw nuts',
  'trail mix (sweetened)': 'unsweetened trail mix',
  
  // More meal replacements and supplements
  'protein bars (high sugar)': 'natural protein sources',
  'meal replacement bars': 'balanced meals',
  'diet shakes': 'balanced meals',
  'weight loss shakes': 'balanced meals',
  'detox drinks': 'fresh fruit and vegetable juices',
  'cleansing drinks': 'fresh fruit and vegetable juices',
};

const DEFAULT_CATEGORY_ASSOCIATIONS: Record<string, string[]> = {
  // Beverages
  'tea': ['sugar', 'honey', 'milk', 'jaggery'],
  'coffee': ['sugar', 'milk', 'cream'],
  'coconut water': ['lime', 'salt'],
  
  // Bread and baked goods
  'bread': ['butter', 'jam', 'peanut butter'],
  'roti': ['curry', 'dhal', 'sambol'],
  'hoppers': ['coconut sambol', 'curry'],
  'string hoppers': ['coconut sambol', 'curry', 'dhal'],
  'pittu': ['coconut sambol', 'curry'],
  
  // Rice and grains
  'rice': ['vegetables', 'curry', 'dhal', 'sambol'],
  'samba rice': ['curry', 'dhal', 'coconut sambol'],
  'red rice': ['curry', 'dhal', 'vegetables'],
  'brown rice': ['curry', 'vegetables'],
  
  // Protein
  'eggs': ['milk', 'cheese', 'onions', 'green chilies'],
  'chicken': ['vegetables', 'spices', 'curry powder', 'onions', 'garlic', 'ginger'],
  'fish': ['lemon', 'vegetables', 'curry powder', 'turmeric', 'chili powder'],
  'prawns': ['curry powder', 'coconut milk', 'lime'],
  'crab': ['curry powder', 'coconut milk', 'lime'],
  'dhal': ['coconut milk', 'curry leaves', 'mustard seeds', 'onions'],
  'chickpeas': ['coconut milk', 'curry powder', 'onions'],
  'green gram': ['coconut milk', 'curry leaves'],
  
  // Vegetables (Sri Lankan)
  'brinjal': ['curry powder', 'coconut milk', 'onions'],
  'okra': ['curry powder', 'coconut milk', 'tomatoes'],
  'snake gourd': ['coconut milk', 'curry powder', 'turmeric'],
  'pumpkin': ['coconut milk', 'curry powder', 'cinnamon'],
  'gotukola': ['coconut', 'lime', 'onions'],
  'kankun': ['coconut', 'lime', 'chili'],
  'cabbage': ['curry powder', 'coconut', 'carrots'],
  'beans': ['coconut', 'curry powder', 'onions'],
  'carrots': ['coconut', 'curry powder'],
  'potatoes': ['curry powder', 'onions', 'green chilies'],
  'tomatoes': ['onions', 'curry powder', 'coconut'],
  
  // Spices and condiments
  'curry powder': ['turmeric', 'chili powder', 'cinnamon', 'cardamom'],
  'turmeric': ['curry powder', 'chili powder', 'cumin'],
  'chili powder': ['curry powder', 'turmeric', 'coriander powder'],
  'cinnamon': ['cardamom', 'cloves', 'curry powder'],
  'cardamom': ['cinnamon', 'cloves', 'curry powder'],
  'coconut milk': ['curry powder', 'turmeric', 'onions'],
  'coconut': ['lime', 'chili', 'onions'],
  'coconut sambol': ['lime', 'chili', 'onions', 'salt'],
  'pol sambol': ['lime', 'chili', 'onions', 'salt'],
  'lunumiris': ['lime', 'chili', 'onions'],
  
  // Pasta and noodles
  'pasta': ['tomato sauce', 'cheese', 'garlic'],
  'noodles': ['vegetables', 'soy sauce', 'eggs'],
  
  // Dairy
  'milk': ['sugar', 'tea', 'coffee'],
  'yogurt': ['honey', 'fruits'],
  'cheese': ['bread', 'butter'],
  
  // Fruits
  'bananas': ['honey', 'yogurt'],
  'papaya': ['lime', 'honey'],
  'mango': ['chili powder', 'salt'],
  'pineapple': ['chili powder', 'salt'],
  
  // Cooking essentials
  'onions': ['garlic', 'ginger', 'curry leaves'],
  'garlic': ['onions', 'ginger', 'curry leaves'],
  'ginger': ['garlic', 'onions', 'curry leaves'],
  'curry leaves': ['mustard seeds', 'onions', 'garlic'],
  'mustard seeds': ['curry leaves', 'onions'],
  'fenugreek': ['curry powder', 'dhal'],
  'pandan leaves': ['rice', 'coconut milk'],
  'lemongrass': ['coconut milk', 'curry'],
  
  // Snacks
  'cashew nuts': ['raisins', 'dried fruits'],
  'peanuts': ['chili', 'salt'],
  
  // Traditional Sri Lankan dishes
  'kottu roti': ['curry', 'vegetables', 'eggs', 'chicken'],
  'rice and curry': ['dhal', 'vegetables', 'sambol', 'papadam', 'curry'],
  'kiribath': ['lunumiris', 'coconut sambol', 'jaggery'],
  'appam': ['coconut milk', 'sugar', 'honey', 'jaggery'],
  'wattalappam': ['coconut milk', 'jaggery', 'cardamom'],
  'kavum': ['oil', 'flour', 'jaggery'],
  'kokis': ['flour', 'coconut milk', 'eggs'],
  'aluwa': ['rice flour', 'jaggery', 'coconut'],
  // More Sri Lankan vegetables
  'bitter gourd': ['curry powder', 'coconut milk', 'onions'],
  'ridge gourd': ['coconut milk', 'curry powder', 'turmeric'],
  'ash plantain': ['coconut milk', 'curry powder', 'cinnamon'],
  'breadfruit': ['coconut milk', 'curry powder', 'onions'],
  'jackfruit': ['coconut milk', 'curry powder', 'chili'],
  'drumsticks': ['coconut milk', 'curry powder', 'turmeric'],
  'ladies fingers': ['curry powder', 'coconut milk', 'tomatoes'],
  'brinjal curry': ['coconut milk', 'curry powder', 'onions'],
  'pumpkin curry': ['coconut milk', 'curry powder', 'cinnamon'],
  'cucumber': ['lime', 'chili', 'onions'],
  'radish': ['coconut', 'curry powder', 'lime'],
  'beetroot': ['coconut', 'curry powder', 'onions'],
  'cauliflower': ['curry powder', 'coconut', 'onions'],
  'broccoli': ['coconut', 'curry powder', 'garlic'],
  'spinach': ['coconut', 'lime', 'onions'],
  'mukunuwenna': ['coconut', 'lime', 'onions'],
  'thampala': ['coconut', 'lime', 'chili'],
  'kohila': ['coconut', 'lime', 'onions'],
  'nivithi': ['coconut', 'lime', 'chili'],
  
  // More seafood
  'tuna': ['curry powder', 'coconut milk', 'lime'],
  'salmon': ['lemon', 'herbs', 'garlic'],
  'sardines': ['curry powder', 'onions', 'chili'],
  'mackerel': ['curry powder', 'coconut milk', 'turmeric'],
  'seer fish': ['curry powder', 'coconut milk', 'lime'],
  'sprats': ['curry powder', 'chili', 'onions'],
  'anchovies': ['curry powder', 'coconut', 'lime'],
  'lobster': ['curry powder', 'coconut milk', 'garlic'],
  'mussels': ['curry powder', 'coconut milk', 'lime'],
  'oysters': ['lime', 'chili', 'onions'],
  
  // More legumes and pulses
  'black gram': ['coconut milk', 'curry leaves', 'onions'],
  'cowpeas': ['coconut milk', 'curry powder', 'onions'],
  'soybeans': ['coconut milk', 'curry powder', 'garlic'],
  'red lentils': ['coconut milk', 'curry leaves', 'turmeric'],
  'yellow lentils': ['coconut milk', 'curry powder', 'onions'],
  'black beans': ['coconut milk', 'curry powder', 'onions'],
  'kidney beans': ['coconut milk', 'curry powder', 'tomatoes'],
  'lima beans': ['coconut milk', 'curry powder', 'onions'],
  
  // More fruits (Sri Lankan)
  'wood apple': ['honey', 'jaggery'],
  'beli': ['salt', 'chili'],
  'rambutan': ['lime', 'salt'],
  'mangosteen': ['honey'],
  'durian': ['honey'],
  'passion fruit': ['honey', 'yogurt'],
  'guava': ['chili powder', 'salt'],
  'star fruit': ['chili powder', 'salt'],
  'soursop': ['honey', 'lime'],
  'custard apple': ['honey'],
  'pomegranate': ['honey', 'yogurt'],
  'dragon fruit': ['honey', 'lime'],
  'lychee': ['lime', 'salt'],
  'longan': ['honey'],
  'jambu': ['chili powder', 'salt'],
  'ambarella': ['chili powder', 'salt'],
  'veralu': ['chili powder', 'salt'],
  
  // More spices and seasonings
  'fennel seeds': ['curry powder', 'cumin'],
  'star anise': ['cinnamon', 'cardamom'],
  'bay leaves': ['curry leaves', 'cinnamon'],
  'nutmeg': ['cinnamon', 'cardamom'],
  'mace': ['cinnamon', 'nutmeg'],
  'saffron': ['turmeric', 'saffron'],
  'asafoetida': ['curry powder', 'garlic'],
  'tamarind': ['lime', 'vinegar'],
  'dried tamarind': ['fresh tamarind'],
  'coconut vinegar': ['lime', 'vinegar'],
  'maldive fish': ['curry powder', 'chili'],
  'dried fish': ['curry powder', 'coconut'],
  
  // More cooking ingredients
  'rice flour': ['coconut milk', 'jaggery'],
  'wheat flour': ['yeast', 'sugar'],
  'corn flour': ['coconut milk', 'sugar'],
  'tapioca': ['coconut', 'jaggery'],
  'manioc': ['coconut', 'curry powder'],
  'sweet potato': ['coconut', 'jaggery'],
  'cassava': ['coconut', 'curry powder'],
  
  // Breakfast items
  'porridge': ['honey', 'fruits', 'nuts'],
  'oats': ['honey', 'fruits', 'milk'],
  'cornflakes': ['milk', 'honey', 'fruits'],
  'muesli': ['milk', 'honey', 'yogurt'],
  
  // More traditional items
  'thosai': ['dhal', 'coconut sambol', 'curry'],
  'iddli': ['dhal', 'coconut sambol', 'curry'],
  'vadai': ['dhal', 'curry leaves', 'chili'],
  'bonda': ['flour', 'curry leaves', 'chili'],
  'cutlet': ['potatoes', 'curry powder', 'breadcrumbs'],
  'roll': ['flour', 'curry', 'vegetables'],
  'samosa': ['flour', 'curry', 'potatoes'],
  
  // More beverages
  'ginger tea': ['honey', 'lime', 'jaggery'],
  'herbal tea': ['honey', 'lemon'],
  'green tea': ['honey', 'lemon'],
  'black tea': ['sugar', 'milk', 'jaggery'],
  'coconut toddy': ['lime', 'salt'],
  'king coconut': ['lime', 'salt'],
  
  // More snacks
  'roasted gram': ['chili', 'salt'],
  'chickpeas roasted': ['chili', 'salt'],
  'peanuts roasted': ['chili', 'salt'],
  'cashews roasted': ['salt'],
  'almonds': ['honey', 'yogurt'],
  'walnuts': ['honey', 'yogurt'],
  'raisins': ['nuts', 'yogurt'],
  'dates': ['nuts', 'yogurt'],
  'prunes': ['nuts', 'yogurt'],
  
  // More condiments and sauces
  'chili sauce': ['fresh chili', 'lime'],
  'tomato sauce': ['fresh tomatoes', 'onions'],
  'soy sauce': ['ginger', 'garlic'],
  'oyster sauce': ['soy sauce', 'ginger'],
  'fish sauce': ['lime', 'chili'],
  'worcestershire sauce': ['soy sauce', 'vinegar'],
  'barbecue sauce': ['tomato sauce', 'honey'],
  'hot sauce': ['fresh chili', 'vinegar'],
  
  // More dairy products
  'buttermilk': ['salt', 'curry leaves'],
  'lassi': ['yogurt', 'honey'],
  'paneer': ['curry powder', 'onions'],
  'mozzarella': ['tomatoes', 'basil'],
  'cheddar': ['bread', 'butter'],
  'feta': ['olives', 'tomatoes'],
  
  // More grains
  'quinoa': ['vegetables', 'herbs'],
  'barley': ['vegetables', 'curry'],
  'millet': ['vegetables', 'curry'],
  'buckwheat': ['vegetables', 'herbs'],
  'bulgur': ['vegetables', 'herbs'],
  'couscous': ['vegetables', 'herbs'],
};

const DEFAULT_EXIRY_DAYS: Record<string, number> = {
  // Dairy products
  'milk': 7,
  'low-fat milk': 7,
  'full cream milk': 7,
  'whole milk': 7,
  'yogurt': 7,
  'low-fat yogurt': 7,
  'cheese': 10,
  'cottage cheese': 5,
  'cream': 5,
  'butter': 30,
  'ghee': 180,
  'margarine': 90,
  
  // Eggs
  'eggs': 14,
  'chicken eggs': 14,
  'duck eggs': 14,
  
  // Bread and baked goods
  'bread': 5,
  'white bread': 5,
  'brown bread': 5,
  'roti': 2,
  'hoppers': 1,
  'string hoppers': 1,
  'pittu': 2,
  'appam': 1,
  
  // Meat and seafood
  'meat': 3,
  'chicken': 3,
  'beef': 3,
  'pork': 3,
  'mutton': 3,
  'fish': 2,
  'fresh fish': 2,
  'prawns': 2,
  'crab': 2,
  'cuttlefish': 2,
  'squid': 2,
  'canned fish': 365,
  'processed meat': 7,
  
  // Vegetables (general)
  'vegetables': 7,
  'fresh vegetables': 7,
  'leafy vegetables': 3,
  'gotukola': 2,
  'kankun': 2,
  'mukunuwenna': 2,
  'brinjal': 7,
  'okra': 5,
  'snake gourd': 5,
  'pumpkin': 14,
  'cabbage': 7,
  'carrots': 14,
  'potatoes': 30,
  'onions': 30,
  'garlic': 60,
  'ginger': 14,
  'tomatoes': 7,
  'beans': 5,
  'green beans': 5,
  'cucumber': 7,
  'bell peppers': 7,
  'chili': 7,
  'green chilies': 5,
  
  // Fruits
  'fruits': 5,
  'fresh fruits': 5,
  'bananas': 5,
  'papaya': 3,
  'mango': 5,
  'pineapple': 5,
  'watermelon': 7,
  'oranges': 14,
  'apples': 30,
  'grapes': 7,
  'avocado': 3,
  
  // Rice and grains
  'rice': 365,
  'white rice': 365,
  'brown rice': 180,
  'samba rice': 365,
  'red rice': 180,
  'basmati rice': 365,
  'dhal': 365,
  'chickpeas': 365,
  'green gram': 365,
  'lentils': 365,
  
  // Spices and condiments
  'curry powder': 180,
  'turmeric': 365,
  'chili powder': 180,
  'cinnamon': 365,
  'cardamom': 365,
  'cloves': 365,
  'cumin': 365,
  'coriander powder': 180,
  'pepper': 365,
  'salt': 9999,
  'sugar': 9999,
  'jaggery': 365,
  'honey': 9999,
  
  // Coconut products
  'coconut': 7,
  'fresh coconut': 7,
  'coconut milk': 2,
  'fresh coconut milk': 2,
  'packaged coconut milk': 7,
  'desiccated coconut': 180,
  'coconut oil': 365,
  'virgin coconut oil': 365,
  
  // Sambol and condiments
  'coconut sambol': 2,
  'pol sambol': 2,
  'lunumiris': 2,
  'fresh sambol': 2,
  'pickles': 180,
  'chutney': 30,
  
  // Herbs and leaves
  'curry leaves': 5,
  'pandan leaves': 3,
  'lemongrass': 7,
  'mint': 5,
  'coriander leaves': 5,
  
  // Pasta and noodles
  'pasta': 365,
  'noodles': 365,
  'instant noodles': 365,
  
  // Canned and packaged
  'canned vegetables': 365,
  'canned fruits': 365,
  'packaged juice': 180,
  'tomato sauce': 365,
  'soy sauce': 365,
  
  // Beverages
  'fresh fruit juice': 2,
  'coconut water': 2,
  'tea': 365,
  'coffee': 365,
  
  // Snacks
  'potato chips': 90,
  'biscuits': 180,
  'cookies': 90,
  'nuts': 180,
  'cashew nuts': 180,
  'peanuts': 180,
  
  // Other
  'flour': 180,
  'white flour': 180,
  'whole wheat flour': 180,
  'rice flour': 180,
  'corn flour': 180,
  'semolina': 180,
  'baking powder': 365,
  'baking soda': 365,
  'yeast': 30,
  'oil': 365,
  'vegetable oil': 365,
  'sunflower oil': 365,
  'canola oil': 365,
  'olive oil': 365,
  'sesame oil': 365,
  
  // More Sri Lankan vegetables
  'bitter gourd': 7,
  'ridge gourd': 5,
  'ash plantain': 7,
  'breadfruit': 7,
  'jackfruit': 3,
  'drumsticks': 5,
  'ladies fingers': 5,
  'radish': 7,
  'beetroot': 14,
  'cauliflower': 7,
  'broccoli': 7,
  'spinach': 3,
  'thampala': 2,
  'kohila': 2,
  'nivithi': 2,
  
  // More seafood
  'tuna': 2,
  'salmon': 2,
  'sardines': 2,
  'mackerel': 2,
  'seer fish': 2,
  'sprats': 2,
  'anchovies': 2,
  'lobster': 2,
  'mussels': 2,
  'oysters': 1,
  'scallops': 2,
  'clams': 2,
  
  // More legumes
  'black gram': 365,
  'cowpeas': 365,
  'soybeans': 365,
  'red lentils': 365,
  'yellow lentils': 365,
  'black beans': 365,
  'kidney beans': 365,
  'lima beans': 365,
  'black eyed peas': 365,
  'mung beans': 365,
  
  // More fruits
  'wood apple': 7,
  'beli': 5,
  'rambutan': 5,
  'mangosteen': 5,
  'durian': 3,
  'passion fruit': 7,
  'guava': 5,
  'star fruit': 7,
  'soursop': 5,
  'custard apple': 5,
  'pomegranate': 14,
  'dragon fruit': 7,
  'lychee': 5,
  'longan': 5,
  'jambu': 5,
  'ambarella': 7,
  'veralu': 5,
  'orange': 14,
  'lemon': 14,
  'lime': 14,
  'grapefruit': 14,
  'kiwi': 7,
  'strawberries': 5,
  'blueberries': 7,
  'raspberries': 3,
  'blackberries': 5,
  'cherries': 7,
  'peaches': 5,
  'plums': 5,
  'pears': 14,
  'figs': 3,
  'dates': 180,
  'prunes': 180,
  
  // More spices
  'fennel seeds': 365,
  'star anise': 365,
  'bay leaves': 180,
  'nutmeg': 365,
  'mace': 365,
  'saffron': 730,
  'asafoetida': 365,
  'tamarind': 180,
  'dried tamarind': 365,
  'fenugreek seeds': 365,
  'mustard seeds': 365,
  'cumin seeds': 365,
  'coriander seeds': 365,
  'ajwain': 365,
  'carom seeds': 365,
  'black pepper': 365,
  'white pepper': 365,
  'paprika': 180,
  'cayenne pepper': 180,
  'red pepper flakes': 180,
  'garam masala': 180,
  'rasam powder': 180,
  'sambar powder': 180,
  
  // More condiments
  'tamarind paste': 180,
  'coconut vinegar': 365,
  'maldive fish': 180,
  'dried fish': 180,
  'anchovy paste': 180,
  'fish paste': 180,
  'shrimp paste': 180,
  'miso paste': 180,
  'hoisin sauce': 365,
  'teriyaki sauce': 365,
  'sriracha': 365,
  'tabasco': 365,
  'vinegar': 9999,
  'white vinegar': 9999,
  'apple cider vinegar': 9999,
  'balsamic vinegar': 9999,
  'rice vinegar': 9999,
  
  // More cooking ingredients
  'tapioca': 30,
  'manioc': 7,
  'sweet potato': 30,
  'cassava': 7,
  'yam': 30,
  'taro': 7,
  'arrowroot': 180,
  
  // More grains and cereals
  'quinoa': 365,
  'barley': 365,
  'millet': 365,
  'buckwheat': 365,
  'bulgur': 365,
  'couscous': 365,
  'oats': 365,
  'rolled oats': 365,
  'instant oats': 365,
  'steel cut oats': 365,
  'cornmeal': 180,
  'polenta': 180,
  
  // More traditional Sri Lankan items
  'thosai': 1,
  'iddli': 1,
  'vadai': 1,
  'bonda': 1,
  'cutlet': 1,
  'roll': 1,
  'samosa': 1,
  'kavum': 3,
  'kokis': 7,
  'aluwa': 7,
  'wattalappam': 2,
  'kiri pani': 2,
  'kalu dodol': 30,
  'mun kewum': 7,
  'aasmi': 7,
  
  // More beverages
  'ginger tea': 365,
  'herbal tea': 365,
  'green tea': 365,
  'black tea': 365,
  'white tea': 365,
  'oolong tea': 365,
  'chai': 365,
  'coconut toddy': 1,
  'king coconut': 7,
  'thambili': 7,
  'smoothie': 1,
  
  // More snacks
  'roasted gram': 180,
  'chickpeas roasted': 180,
  'peanuts roasted': 180,
  'cashews roasted': 180,
  'almonds': 180,
  'walnuts': 180,
  'pistachios': 180,
  'hazelnuts': 180,
  'pecans': 180,
  'macadamia': 180,
  'brazil nuts': 180,
  'sunflower seeds': 180,
  'pumpkin seeds': 180,
  'sesame seeds': 365,
  'chia seeds': 365,
  'flax seeds': 365,
  'hemp seeds': 365,
  'poppy seeds': 365,
  
  // More dairy and alternatives
  'buttermilk': 5,
  'lassi': 2,
  'kefir': 7,
  'sour cream': 14,
  'cream cheese': 14,
  'mascarpone': 7,
  'ricotta': 7,
  'mozzarella': 14,
  'cheddar': 30,
  'feta': 30,
  'parmesan': 180,
  'gouda': 30,
  'brie': 14,
  'camembert': 14,
  'goat cheese': 14,
  'blue cheese': 30,
  'swiss cheese': 30,
  'almond milk': 7,
  'soy milk': 7,
  'oat milk': 7,
  'coconut milk (carton)': 7,
  'rice milk': 7,
  
  // More condiments and sauces
  'oyster sauce': 365,
  'fish sauce': 365,
  'worcestershire sauce': 365,
  'barbecue sauce': 365,
  'hot sauce': 365,
  'mustard': 365,
  'horseradish': 180,
  'wasabi': 180,
  'pesto': 30,
  'hummus': 7,
  'tahini': 180,
  'peanut butter': 180,
  'almond butter': 180,
  'cashew butter': 180,
  
  // More breakfast items
  'porridge': 1,
  'cornflakes': 365,
  'muesli': 180,
  'granola': 180,
  'cereal': 365,
  
  // More baking items
  'vanilla extract': 365,
  'almond extract': 365,
  'cocoa powder': 365,
  'chocolate chips': 180,
  'coconut flakes': 180,
  'raisins': 180,
  'dried cranberries': 180,
  'dried apricots': 180,
  'dried dates': 180,
  'dried figs': 180,
  
  // More Sri Lankan rice varieties
  'keeri samba': 365,
  'sudu kekulu': 365,
  'nadu': 365,
  'ma wee': 365,
  'kuruluthuda': 365,
  'rathu kekulu': 180,
  
  // More pickles and preserves
  'mango pickle': 180,
  'lime pickle': 180,
  'chili pickle': 180,
  'mixed pickle': 180,
  'jam': 365,
  'jelly': 365,
  'marmalade': 365,
  'maple syrup': 365,
  'agave syrup': 365,
  'molasses': 365,
};

// Helper function to safely load rules from storage (client-side only)
function safeLoadRules() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    // Use dynamic import to avoid server-side issues
    const storage = require('./rules-storage');
    return storage.loadRules();
  } catch {
    return null;
  }
}

// Helper function to get healthier alternatives map (server-safe)
function getHealthierAlternativesMap(): Record<string, string> {
  // Start with default rules (includes all 550+ items)
  const map: Record<string, string> = { ...DEFAULT_HEALTHIER_ALTERNATIVES };
  
  // Merge with user-customized rules from storage (if any)
  const rules = safeLoadRules();
  if (rules && rules.healthierAlternatives) {
    rules.healthierAlternatives.forEach((rule: { unhealthyItem: string; healthyAlternative: string }) => {
      // User customizations override defaults
      map[rule.unhealthyItem.toLowerCase()] = rule.healthyAlternative;
    });
  }
  
  // Debug: Log total number of rules (only in development)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Healthier Alternatives] Loaded ${Object.keys(map).length} rules`);
  }
  
  return map;
}

// Export function to get all default healthier alternatives for UI display
export function getAllDefaultHealthierAlternatives(): Array<{ unhealthyItem: string; healthyAlternative: string }> {
  return Object.entries(DEFAULT_HEALTHIER_ALTERNATIVES).map(([unhealthyItem, healthyAlternative]) => ({
    unhealthyItem,
    healthyAlternative,
  }));
}

// Helper function to get category associations map (server-safe)
function getCategoryAssociationsMap(): Record<string, string[]> {
  // Start with default rules (includes all 150+ items)
  const map: Record<string, string[]> = { ...DEFAULT_CATEGORY_ASSOCIATIONS };
  
  // Merge with user-customized rules from storage (if any)
  const rules = safeLoadRules();
  if (rules && rules.categoryAssociations) {
    rules.categoryAssociations.forEach((rule: { primaryItem: string; suggestedItems: string[] }) => {
      // User customizations override defaults
      map[rule.primaryItem.toLowerCase()] = rule.suggestedItems;
    });
  }
  return map;
}

// Helper function to get default expiry days map (server-safe)
function getDefaultExpiryDaysMap(): Record<string, number> {
  // Start with default rules (includes all 250+ items)
  const map: Record<string, number> = { ...DEFAULT_EXIRY_DAYS };
  
  // Merge with user-customized rules from storage (if any)
  const rules = safeLoadRules();
  if (rules && rules.defaultExpiryRules) {
    rules.defaultExpiryRules.forEach((rule: { itemName: string; defaultExpiryDays: number }) => {
      // User customizations override defaults
      map[rule.itemName.toLowerCase()] = rule.defaultExpiryDays;
    });
  }
  return map;
}

interface Suggestion {
  item: string;
  reason: string;
  type: 're-purchase' | 'category' | 'healthier';
}

export function evaluateRePurchaseRules(
  purchaseHistory: PurchaseHistoryItem[],
  currentGroceryList: GroceryItem[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentItemNames = currentGroceryList.map(item => item.name.toLowerCase());
  const now = new Date();
  const DEFAULT_EXIRY_DAYS = getDefaultExpiryDaysMap();

  // Rule: If item was purchased in the last 7 days and typically runs out weekly → suggest adding it
  purchaseHistory.forEach(item => {
    const purchaseDate = new Date(item.purchaseDate);
    const daysSincePurchase = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Check if item is not in current list
    if (!currentItemNames.includes(item.itemName.toLowerCase())) {
      // Rule: If purchased within last 7 days and expiry is around 7 days, suggest re-purchase
      if (daysSincePurchase >= 5 && daysSincePurchase <= 7) {
        const typicalExpiry = DEFAULT_EXIRY_DAYS[item.itemName.toLowerCase()] || item.expiryTimeInDays;
        if (typicalExpiry <= 7) {
          suggestions.push({
            item: item.itemName,
            reason: `You bought ${item.itemName} ${daysSincePurchase} days ago, and it typically runs out within a week. Should I add it again?`,
            type: 're-purchase',
          });
        }
      }
      
      // Rule: If item was purchased frequently (more than 3 times in history), suggest it
      const purchaseCount = purchaseHistory.filter(
        h => h.itemName.toLowerCase() === item.itemName.toLowerCase()
      ).length;
      if (purchaseCount >= 3 && daysSincePurchase <= 14) {
        const existing = suggestions.find(s => s.item.toLowerCase() === item.itemName.toLowerCase());
        if (!existing) {
          suggestions.push({
            item: item.itemName,
            reason: `You frequently buy ${item.itemName}. Would you like to add it to your list?`,
            type: 're-purchase',
          });
        }
      }
    }
  });

  return suggestions;
}

export function evaluateCategoryRules(
  currentGroceryList: GroceryItem[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentItemNames = currentGroceryList.map(item => item.name.toLowerCase());
  const CATEGORY_ASSOCIATIONS = getCategoryAssociationsMap();

  // Check for category associations
  currentItemNames.forEach(itemName => {
    const associations = CATEGORY_ASSOCIATIONS[itemName];
    if (associations) {
      associations.forEach(associatedItem => {
        if (!currentItemNames.includes(associatedItem.toLowerCase())) {
          suggestions.push({
            item: associatedItem,
            reason: `You have ${itemName} in your list. Would you like to add ${associatedItem} as well?`,
            type: 'category',
          });
        }
      });
    }
  });

  return suggestions;
}

export function evaluateHealthierAlternatives(
  currentGroceryList: GroceryItem[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentItemNames = currentGroceryList.map(item => item.name.toLowerCase().trim());
  const HEALTHIER_ALTERNATIVES = getHealthierAlternativesMap();

  // First, try exact matches
  currentItemNames.forEach(itemName => {
    const healthier = HEALTHIER_ALTERNATIVES[itemName];
    if (healthier && !currentItemNames.includes(healthier.toLowerCase())) {
      suggestions.push({
        item: healthier,
        reason: `Consider replacing ${itemName} with ${healthier} for a healthier option.`,
        type: 'healthier',
      });
    }
  });

  // Also try partial/fuzzy matching for better coverage
  // Check if any part of the item name matches a key
  currentItemNames.forEach(itemName => {
    // Skip if we already found an exact match
    const alreadySuggested = suggestions.some(s => 
      s.reason.toLowerCase().includes(`replacing ${itemName}`)
    );
    
    if (!alreadySuggested) {
      // Try to find partial matches - check each key
      Object.keys(HEALTHIER_ALTERNATIVES).forEach(key => {
        const keyLower = key.toLowerCase();
        const alternative = HEALTHIER_ALTERNATIVES[key];
        
        // Skip if alternative is already in the list
        if (currentItemNames.includes(alternative.toLowerCase())) {
          return;
        }
        
        // Check for various match patterns
        const exactKeyMatch = itemName === keyLower;
        const keyInItem = itemName.includes(keyLower);
        const itemInKey = keyLower.includes(itemName);
        
        // Word-based matching
        const itemWords = itemName.split(/\s+/).filter(w => w.length > 2);
        const keyWords = keyLower.split(/\s+/).filter(w => w.length > 2);
        const wordMatch = itemWords.some(iw => 
          keyWords.some(kw => iw === kw || iw.includes(kw) || kw.includes(iw))
        );
        
        // If we have a match and haven't already suggested this alternative
        if ((exactKeyMatch || keyInItem || itemInKey || wordMatch) && !alreadySuggested) {
          const isDuplicate = suggestions.some(s => 
            s.item.toLowerCase() === alternative.toLowerCase() || 
            s.reason.toLowerCase().includes(`replacing ${itemName}`)
          );
          
          if (!isDuplicate) {
            suggestions.push({
              item: alternative,
              reason: `Consider replacing ${itemName} with ${alternative} for a healthier option.`,
              type: 'healthier',
            });
          }
        }
      });
    }
  });

  return suggestions;
}

export function evaluateExpiryReminders(
  purchaseHistory: PurchaseHistoryItem[]
): Array<{ message: string; severity: 'warning' | 'critical' }> {
  const reminders: Array<{ message: string; severity: 'warning' | 'critical' }> = [];
  const now = new Date();
  const DEFAULT_EXIRY_DAYS = getDefaultExpiryDaysMap();

  purchaseHistory.forEach(item => {
    const purchaseDate = new Date(item.purchaseDate);
    const expiryDays = item.expiryTimeInDays || DEFAULT_EXIRY_DAYS[item.itemName.toLowerCase()] || 7;
    const expiryDate = new Date(purchaseDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      reminders.push({
        message: `${item.itemName} has expired. Consider replacing it.`,
        severity: 'critical',
      });
    } else if (daysUntilExpiry <= 3) {
      reminders.push({
        message: `${item.itemName} will expire in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}.`,
        severity: 'warning',
      });
    }
  });

  return reminders;
}

export function getAllRuleBasedSuggestions(
  purchaseHistory: PurchaseHistoryItem[],
  currentGroceryList: GroceryItem[]
): {
  rePurchase: Suggestion[];
  category: Suggestion[];
  healthier: Suggestion[];
  expiry: Array<{ message: string; severity: 'warning' | 'critical' }>;
} {
  return {
    rePurchase: evaluateRePurchaseRules(purchaseHistory, currentGroceryList),
    category: evaluateCategoryRules(currentGroceryList),
    healthier: evaluateHealthierAlternatives(currentGroceryList),
    expiry: evaluateExpiryReminders(purchaseHistory),
  };
}

