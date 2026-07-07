/* Seed vendor data — drawn from the vendor names already listed inside
   existing event detail pages (fm = Farmers Market, sm = SoFA Market), so
   the new Vendor Hub isn't empty on first load. Reuses the same category
   keys (market/foodhall/artwalk/cityart/venue/holiday/shop) as events so
   colors, ribbons, and filter pills stay consistent across the site.

   boost{} mirrors a Flash/Anchor/Neighborhood tier model (inert placeholder
   data only — no payment wiring yet):
     tier: null | "flash" | "anchor" | "hood"
     active: whether the boost is currently in effect
     until: ISO end time (flash/anchor) or "" (hood is a standing subscription)
     radius: miles, only meaningful for "hood" tier */
var VENDOR_DEF = [
  {id:"v-xiong",name:"Xiong Farms",cat:"market",
   desc:"Third-generation family farm growing fresh Asian vegetables for the downtown market.",
   menu:"Seasonal Asian vegetables: bok choy, gai lan, yu choy, bitter melon (varies weekly).",
   address:"101 Paseo de San Antonio, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"",tue:"",wed:"9:00am - 1:30pm",thu:"",fri:"",sat:"",sun:""},
   featured:true,verified:false,
   boost:{tier:null,active:false,until:"",radius:null},
   mx:210,my:255,city:"sj",events:["fm"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-babytiger",name:"Baby Tiger Bakery",cat:"market",
   desc:"Handmade conchas, pan dulce, and seasonal baked goods.",
   menu:"Conchas, pan dulce, seasonal fruit empanadas, horchata.",
   address:"101 Paseo de San Antonio, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"",tue:"",wed:"9:00am - 1:30pm",thu:"",fri:"",sat:"",sun:""},
   featured:true,verified:false,
   boost:{tier:"flash",active:true,until:"",radius:null},
   mx:230,my:270,city:"sj",events:["fm"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-dumplingking",name:"Dumpling King",cat:"market",
   desc:"Traditional family-recipe dumplings, made fresh every market day.",
   menu:"Pork dumplings, veggie dumplings, chili oil wontons.",
   address:"101 Paseo de San Antonio, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"",tue:"",wed:"9:00am - 1:30pm",thu:"",fri:"",sat:"",sun:""},
   featured:false,verified:false,
   boost:{tier:null,active:false,until:"",radius:null},
   mx:190,my:270,city:"sj",events:["fm"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-seamoss",name:"Sea Moss Healing",cat:"artwalk",
   desc:"Handmade sea moss soaps and skincare, at the market and South First Fridays.",
   menu:"Sea moss gel, soap bars, body butter, essential oil blends.",
   address:"101 Paseo de San Antonio, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"",tue:"",wed:"9:00am - 1:30pm",thu:"",fri:"5:00pm - 9:00pm (1st Fri)",sat:"",sun:""},
   featured:false,verified:false,
   boost:{tier:null,active:false,until:"",radius:null},
   mx:250,my:240,city:"sj",events:["fm","aw"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-mangoblossom",name:"Mango Blossom Apiary",cat:"market",
   desc:"Local raw honey — wildflower, sage, and seasonal blends.",
   menu:"Wildflower honey, sage honey, honeycomb, bee pollen.",
   address:"101 Paseo de San Antonio, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"",tue:"",wed:"9:00am - 1:30pm",thu:"",fri:"",sat:"",sun:""},
   featured:false,verified:false,
   boost:{tier:null,active:false,until:"",radius:null},
   mx:170,my:255,city:"sj",events:["fm"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-fountainhead",name:"Fountainhead Bar",cat:"foodhall",
   desc:"Craft cocktails at the back of SoFA Market, open daily until 9pm.",
   menu:"Craft cocktails, canned beer, wine by the glass, snack bites.",
   address:"387 S 1st St, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"12:00pm - 9:00pm",tue:"12:00pm - 9:00pm",wed:"12:00pm - 9:00pm",thu:"12:00pm - 9:00pm",fri:"12:00pm - 9:00pm",sat:"12:00pm - 9:00pm",sun:"12:00pm - 9:00pm"},
   featured:true,verified:false,
   boost:{tier:"anchor",active:true,until:"",radius:null},
   mx:470,my:590,city:"sj",events:["sm"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-3hermanos",name:"3 Hermanos Mexican",cat:"foodhall",
   desc:"Tacos, burritos, and a cocktail bar inside SoFA Market, Suite 105.",
   menu:"Tacos, burritos, quesadillas, horchata, margaritas.",
   address:"387 S 1st St, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"11:00am - 9:00pm",tue:"11:00am - 9:00pm",wed:"11:00am - 9:00pm",thu:"11:00am - 9:00pm",fri:"11:00am - 9:00pm",sat:"11:00am - 9:00pm",sun:"11:00am - 9:00pm"},
   featured:false,verified:false,
   boost:{tier:null,active:false,until:"",radius:null},
   mx:490,my:575,city:"sj",events:["sm"],gallery:[],logo:"",cover:"",status:"approved"},

  {id:"v-pizzeriarosamaria",name:"Pizzeria Rosa Maria",cat:"foodhall",
   desc:"Wood-fired pizza, Suite 104 at SoFA Market.",
   menu:"Margherita, pepperoni, veggie, and specialty wood-fired pizzas by the slice or whole.",
   address:"387 S 1st St, San Jose, CA 95113",
   contact:{phone:"",email:""},website:"",
   social:{instagram:"",facebook:"",tiktok:"",twitter:""},
   hours:{mon:"11:00am - 9:00pm",tue:"11:00am - 9:00pm",wed:"11:00am - 9:00pm",thu:"11:00am - 9:00pm",fri:"11:00am - 9:00pm",sat:"11:00am - 9:00pm",sun:"11:00am - 9:00pm"},
   featured:false,verified:false,
   boost:{tier:null,active:false,until:"",radius:null},
   mx:460,my:605,city:"sj",events:["sm"],gallery:[],logo:"",cover:"",status:"approved"}
];
