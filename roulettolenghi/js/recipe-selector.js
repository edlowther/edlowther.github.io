(function() {
  var form = document.getElementById('container__form');
  var resultDiv = document.getElementById('container__result');
  var resultRecipe = resultDiv.getElementsByClassName('list-heading')[0];
  var resultTheWordFrom = resultDiv.getElementsByClassName('the-word-from')[0];
  var resultBookName = resultDiv.getElementsByClassName('book-name')[0];
  var submitButton = document.getElementsByClassName('submit-button')[0];
  var pluralisesCTA = document.getElementById('plural');
  var singularisesCTA = document.getElementById('singular');

  var plentyRecipes = ["Poached baby vegetables with caper mayonnaise", "Spicy Moroccan carrot salad", "Beetroot, orange and black olive salad", "Roasted parsnips and sweet potatoes with caper vinaigrette", "Two-potato vindaloo", "Beetroot, yoghurt and preserved lemon relish", "Royal potato salad", "Surprise tatin", "Jerusalem artichokes with manouri and basil oil", "Sweet potato wedges with lemongrass cr\u00e8me fra\u00eeche", "Parsnip dumplings in broth", "Seasonal tempura", "Sweet potato cakes", "Tamara's ratatouille", "Multi-vegetable paella", "Marinated pepper salad with pecorino", "Very full tart", "Scrambled smoked duck eggs on sourdough", "Shakshuka", "Leek fritters", "Caramelized garlic tart", "Stuffed onions", "Fried leeks", "Black pepper tofu", "Garlic soup and harissa", "Broccoli and Gorgonzola pie", "Broccolini and sweet sesame salad", "Stuffed cabbage", "Smoky frittata", "Purple sprouting broccoli with rice noodles", "Cabbage and kohlrabi salad", "Sweet winter slaw", "Savoy cabbage and Parmesan skin soup", "Brussels sprouts and tofu", "Saffron cauliflower", "Mushroom ragout with poached duck egg", "B\u00e1nh x\u00e8o", "Stuffed portobello with melting Taleggio", "Marinated mushrooms with walnut and tahini yoghurt", "Aubergine with buttermilk sauce", "Soba noodles with aubergine and mango", "Aubergine tricolore (and more)", "Grilled vegetable soup", "Lentils with grilled aubergine", "Aubergine croquettes", "Burnt aubergine with tahini", "Mushroom lasagne", "Wild mushroom parcel", "Marinated buffalo mozzarella and tomato", "Quinoa and grilled sourdough salad", "Tomato, semolina and coriander soup", "Tomato party", "Quesadillas", "Herb-stuffed tomatoes", "Halloween souffl\u00e9s", "Roasted butternut squash with sweet spices, lime and green chilli", "Mixed grill with parsley oil", "Stuffed courgettes", "Courgette and carrot salad", "Baked eggs with yoghurt and chilli", "Chard and saffron omelettes", "Lettuce salad", "Swiss chard chickpea and tamarind stew", "Chard cakes with sorrel sauce", "Green pancakes with lime butter", "Watercress pistachio and orange blossom salad", "Egg, spinach and pecorino pizza", "Caramelized endive with Gruyere", "Vine leaf, herb and yoghurt pie", "Nutty endive with Roquefort", "Bittersweet salad", "Avocado quinoa and broad bean salad", "Coconut rice with sambal and okra", "Lemon and aubergine risotto", "Farro and roasted pepper salad", "Steamed rice with herbs (or, actually, herbs with rice)", "Yoghurt flatbreads with barley and mushrooms", "Barley and pomegranate salad", "Kisir", "Cardamom rice with poached eggs and yoghurt", "Freekeh pilaf", "Itamar bulgur pilaf", "Mango and coconut rice salad", "Quinoa salad with dried Iranian lime", "Cucumber salad with smashed garlic and ginger", "Lemony globe artichokes", "Asparagus fennel and beetroot with verjus", "Caramelized fennel with goat's curd", "Globe artichokes with crushed broad beans", "Artichoke gratin", "Okra with tomato, lemon and coriander", "Green gazpacho", "Asparagus mimosa", "Chargrilled asparagus", "Asparagus vichyssoise", "Mee goreng", "Soba noodles with wakame", "Lemon and goat's cheese ravioli", "Crunchy pappardelle", "Pasta and fried courgette salad", "Green couscous", "Saffron tagliatelle with spiced butter", "The ultimate winter couscous", "Mushroom and herb polenta", "Sweetcorn Polenta", "Mixed beans with many spices and lovage", "Broad bean burgers", "Gado-gado", "Green bean salad with mustard seeds and tarragon", "Warm glass noodles and edamame beans", "Hot yoghurt and broad bean soup", "Figs with basil goat's curd and pomegranate vinaigrette", "Goat's cheese souffl\u00e9s with vanilla-poached peach", "Quince and Dolcelatte salad", "Pear crostini", "Dates and Turkish ewe's cheese", "Watermelon and feta", "Puy lentil galettes", "Hummus with ful", "Chickpea saut\u00e9 with Greek yoghurt", "Fried butter beans with feta sorrel and sumac", "Celeriac and lentils with hazelnut and mint", "Chickpea, tomato and bread soup", "Green lentils, asparagus and watercress", "Spiced red lentils with cucumber yoghurt", "Castelluccio lentils with tomatoes and Gorgonzola", "Socca"]

  var plentyMoreRecipes = ["Tomato and pomegranate salad", "Sort-of-Waldorf", "Fancy coleslaw", "Raw beetroot and herb salad", "Celery salad with feta and soft-boiled egg", "Watercress salad with Quail's eggs, ricotta and seeds", "Raw vegetable salad", "Crunchy root vegetables", "Fig salad", "Pomelo salad", "Pink grapefruit and sumac salad", "Tart apple and celeriac salad", "Parsley, lemon and cannellini bean salad", "Orange and date salad", "Sprout salad", "Sprout salad, part two", "Spring salad", "Dakos", "Caramelised fig, orange and feta salad", "Steamed aubergine with sesame and spring onion", "Rice salad with nuts and sour cherries", "Lemon and curry leaf rice", "Saffron, date and almond rice", "Miso vegetables and rice with black sesame dressing", "Tomato and roasted lemon salad", "Rice noodles with spring onions and soy beans", "Seaweed, ginger and carrot salad", "Spicy turnip", "Soba noodles with quick-pickled mushrooms", "Sprouting broccoli and edamame salad with curry leaves and coconut", "Beetroot, avocado and pea salad", "Sprouting broccoli with sweet tahini", "Peas with sorrel and mustard", "Tagliatelle with walnuts and lemon", "Brussels sprout risotto", "Legume (noodle) soup", "Fregola and artichoke pilaf", "Hot and sour mushroom soup", "Spicy chickpea and bulgar soup", "Spring onion soup", "Thai red lentil soup with aromatic chilli oil", "Tomato and watermelon gazpacho", "Alphonso mango and curried chickpea salad", "Candy beetroot with lentils and yuzu", "Globe artichoke salad with preserved lemon mayonnaise", "Globe artichoke and mozzarella with candied lemon", "Curry laksa", "Quinoa porridge with grilled tomatoes and garlic", "Iranian-style pasta", "Stuffed courgettes", "Slow-cooked chickpeas on toast with poached egg", "Quinoa and fennel salad", "Green beans with freekeh and tahini", "Urad dal with coconut and coriander", "Lentils with mushroom and preserved lemon ragout", "Lightly stewed broad beans, peas and gem lettuce with parmesan rice", "Broad beans with lemon and coriander", "Braised kale with crispy shallots", "Sweet and sour leeks with goat's curd and currants", "Butternut squash with buckwheat polenta and tempura lemon", "Lentils, radicchio and walnuts with manuka honey", "Indian ratatouille", "Fennel with capers and olives", "Mushrooms, garlic and shallots with lemon ricotta", "Iranian vegetable stew with dried lime", "Grilled lettuce with farro and lemon", "Courgette and fennel with saffron crumbs", "Squash with labneh and pickled walnut salsa", "Grilled ziti with feta", "Sweetcorn slaw", "Butternut tataki and udon noodle salad", "Courgette 'baba ganoush'", "Corn on the cob with miso mayonnaise", "Marrow with tomato and feta", "Aubergine with black garlic", "Squash with cardamom and nigella seeds", "Honey-roasted carrots with tahini yoghurt", "Red onions with walnut salsa", "Cauliflower, grape and cheddar salad", "Aubergines with crushed chickpeas and herb yoghurt", "Carrot and mung bean salad", "Roasted Brussels sprouts with pomelo and star anise", "Smoked beetroot with yoghurt and caramelised macadamias", "Sweet potatoes with orange bitters", "Curry roasted root vegetables with lime leaves and juice", "Beetroot and rhubarb salad", "Squash with chilli yoghurt and coriander sauce", "Pea and mint croquettes", "Polenta crisps with avocado and yoghurt", "Seared girolles with black glutinous rice", "Mixed vegetables and yoghurt with green chilli oil", "Smoky polenta chips", "Buttermilk-crusted okra with tomato and bread sauce", "Fried upma with poached egg", "Fried cauliflower with mint and tamarind dipping sauce", "Brussels sprouts with caramelised garlic and lemon peel", "Quinoa and wild garlic cakes with salbitxada sauce", "Udon noodles with fried aubergine, walnut and miso", "Crispy saffron couscous cakes", "Aubergine, potato, tomato", "Coated olives with spicy yoghurt", "Pot barley and lentils with mushrooms and sweet spices", "Aubergine pahi", "Root mash with wine braised shallots", "Fava", "Broad bean spread with roasted garlic ricotta", "Crushed puy lentils with tahini and cumin", "Cannellini bean pur\u00e9e with pickled mushrooms and pitta croutons", "Crushed carrots with harissa and pistachios", "Spice-stuffed potato cakes", "Yoghurt and Kaffir lime leaf spread", "Cresp\u00e9ou", "Aubergine kuku", "Aubergine cheesecake", "Fritter roulette", "Cauliflower cake", "Membrillo and stilton quiche", "Corn and spring onion pancakes", "Spicy scrambled eggs", "Kale and cheese pikelets", "Corsican pie with courgette flowers", "Aubergine kadaifi nests", "Bread and pumpkin 'fondue'", "Mushroom and tarragon pithivier", "Stuffed peppers with fondant swede and goat's cheese", "Baked artichoke and pearled spelt salad", "Winter saffron gratin", "Tomato and almond tart", "Ricotta and rosemary bread pudding", "Baked orzo with mozzarella and oregano", "Taleggio and spinach roulade", "Batata harra", "Baigan choka", "Root vegetable pies", "Blackcurrant friands", "Baked rhubarb with sweet labneh", "Quince poached in pomegranate juice", "Bitter frozen berries with white chocolate cream", "Caramelised brandy pears with fennel seed crackers", "Fig and goat's cheese tart", "Roasted figs with pomegranate molasses and orange zest", "Char-grilled stone fruit with lemon geranium water", "Stewed blackberries with bay custard and gin", "Set 'cheesecake' with plum compote", "Apricot, walnut and lavender cake", "Esme's old-fashioned apple and rhubarb pudding", "Ricotta pancakes with gooseberry relish", "Walnut and halva cake", "Halva ice cream with chocolate sauce and roasted peanuts", "Grilled banana bread with tahini and honeycomb", "Super French toast", "Ricotta fritters with orange and honey", "Pot barley, orange and sesame pudding", "Tau fu fa", "Cold rice and pandan pudding with Alphonso mango and lime syrup", "Meringue roulade with rose petals and fresh raspberries"]

  var simpleRecipes = ["Braised eggs with leek and za'atar", "Harissa and Manchego omelettes", "Courgette and ciabatta frittata", "Portobello mushrooms with brioche and a poached egg", "Scrambled harissa tofu", "Avocado butter on toast with tomato salsa", "Beetroot, caraway and goat's cheese bread", "Cornbread with Cheddar, feta and jalapeno", "Pea, za'atar and feta fritters", "Iranian herb fritters", "Chilled cucumber, cauliflower and ginger soup", "Beef tomato carpaccio with spring onion and ginger salsa", "Tomato and bread salad with anchovies and capers", "Tomatoes with sumac onions and pine nuts", "Chopped salad with tahini and za'atar", "Gem lettuce with fridge-raid dressing", "Cucumber and lamb's lettuce salad", "Watermelon, green apple and lime salad", "5-spice peach and raspberry salad", "Burrata with chargrilled grapes and basil", "Cauliflower 'tabbouleh'", "Spring onion and herb salad", "Curried lentil, tomato and coconut soup", "Courgette, pea and basil soup", "Pumpkin, saffron and orange soup", "Steamed courgettes with garlic and oregano", "Crushed courgettes", "Stuffed courgettes with pine nut salsa", "Herby courgettes and peas with semolina porridge", "Roasted aubergine with anchovies and oregano", "Roasted aubergine with curried yoghurt", "Grilled beef tomatoes with chilli, garlic and ginger", "Hot charred cherry tomatoes with cold yoghurt", "Tomato, chard and spinach with toasted almonds", "Fried broccoli and kale with garlic, cumin and lime", "Tenderstem broccoli with soy sauce, garlic and peanuts", "Roast cabbage with tarragon and pecorino", "Mustard-marinated kale with asparagus", "Roasted asparagus with almonds, capers and dill", "Cavolo nero with chorizo and preserved lemon", "Quick okra with sweet and sour dressing", "Garry's stir-fried cabbage with garlic and chilli", "Cauliflower, pomegranate and pistachio salad", "Mustardy cauliflower cheese", "Roasted whole cauliflower", "Curried egg and cauliflower salad", "Chickpeas and Swiss chard with yoghurt", "Slow-cooked runner beans in tomato sauce", "Tofu and French beans with chraimeh sauce", "Avocado and broad bean mash", "Butterbean mash with muhammara", "Two bean and two lime salad", "Mushrooms and chestnuts with za'atar", "Brussels sprouts with burnt butter and black garlic", "Roasted baby carrots with Harissa and pomegranate", "Carrot salad with yoghurt and cinnamon", "Roasted butternut squash with lentils and dolcelatte", "Butternut squash with sweetcorn salsa, feta and pumpkin seeds", "Roasted beetroot with yoghurt and preserved lemon", "Whole-roasted celeriac with coriander seed oil", "Aromatic olive oil mash", "Sweet potato mash with lime salsa", "Spinach and Gorgonzola-stuffed jacket potatoes", "Jacket potatoes with egg and tonnato sauce", "Oven chips with oregano and feta", "Shallow-fried potatoes with rosemary and sumac", "Harissa and confit garlic roast potatoes", "Sweet potato chips", "Harrisa-baked potato skins and crispy lettuce salad", "New potatoes with peas and coriander", "Pizza binca with potato, anchovy and sage", "Buckwheat and French bean salad", "Couscous, cherry tomato and herb salad", "Puy lentil and aubergine stew", "Bulgur with tomato, aubergine and lemon yoghurt", "Bulgur with mushrooms and feta", "Puy lentils with aubergine, tomatoes and yoghurt", "Brown rice with caramelised onions and black garlic", "Baked mint rice with pomegranate and olive salsa", "Thai sticky rice with crispy ginger, chilli and peanuts", "Baked Rice with confit tomatoes and garlic", "Rice noodle salad with cucumber and poppy seeds", "Soba noodles with lime, cardamom and avocado", "Seaweed spaghetti and sesame salad with tahini dressing", "Pasta alla Norma", "Fettuccine with spiced cherry tomato sauce", "Pappardelle with rose harissa, black olives and capers", "Gigli with chickpeas and za'atar", "Orzo with prawns, tomato and marinated feta", "Pasta with pecorino and pistachios", "Anchovy and samphire spaghetti", "Gnocchi alla Romana", "Lamb and feta meatballs", "Beef sirloin and basil salad", "Lamb siniyah", "Grilled lamb fillet with almonds and orange blossom", "Lamb bake with tahini sauce and tomatoes", "Lamb arayes with tahini and sumac", "Slow-cooked lamb shoulder with mint and cumin", "Lamb and pistachio patties with sumac yoghurt sauce", "Spiced 'shepherd's pie' with butterbean crust", "Arnold's roast chicken with caraway and cranberry stuffing", "Beef meatballs with lemon and celeriac", "Ricotta and oregano meatballs", "Harissa beef sirloin with pepper and lemon sauce", "Spring roast chicken with preserved lemon", "Chicken Marbella", "Chicken with miso, ginger and lime", "Pork with ginger, spring onion and aubergine", "Seeded chicken schnitzel", "Slow-cooked chicken with a crisp corn crust", "Trout tartare with burnt butter and pistachios", "Mackerel with pistachio and cardamom salsa", "Bridget Jones's pan-fried salmon with pine nut salsa", "Roasted trout with tomato orange and barberry salsa", "Chilli fish with tahini", "Coconut-crusted fish fingers", "Fishcake tacos with mango, lime and cumin yoghurt", "Smoked fish and parsnip cakes", "Charred prawn, sweetcorn and tomato salad", "Squid and red pepper stew", "Whole roasted sea bass with soy and ginger", "Rose harissa chickpeas with flaked cod", "Prawn and corn fritters", "Sweet and salty cheesecake with cherries", "Vanilla custard with roasted strawberries and rhubarb", "Sumac-roasted strawberries with yoghurt cream", "Plum, blackberry and bay friand bake", "Blueberry, almond and lemon cake", "Fig and thyme clafoutis", "Honey and yoghurt set cheesecake", "Hazelnut, peach and raspberry cake", "Spiced apple cake", "Nutella, sesame and hazelnut rolls", "Mint and pistachio chocolate fridge cake", "Brunsli chocolate cookies", "No-churn raspberry ice cream"];

  var sweetRecipes = ["Persian love cakes", "Saffron, orange and honey madeleines", "Lemon and raspberry cupcakes", "Powder puffs (raspberry and rose)", "Powder puffs (chocolate and chestnut)", "Tahini and halva brownies", "Lemon, blueberry and almond 'teacakes'", "Hazelnut crumble cake with Gianduja (or Nutella) icing", "Baby black and orange cakes", "Strawberry and vanilla mini-cakes", "Victoria sponge with strawberries and white chocolate cream", "Banana cakes with rum caramel", "Blackberry and star anise friands", "Coffee and walnut financiers", "Flourless chocolate 'teacakes'", "Lemon and semolina syrup cakes", "Roma's doughnuts with saffron custard cream", "Chocolate Guinness cakes with Baileys Irish Cream", "Custard yo-yos with roasted rhubarb icing", "Peanut sandies", "Almond, pistachio and sour cherry wafers", "Cranberry, oat and white chocolate biscuits", "Chocolate chip and pecan cookies", "Cats' tongues", "Chocolate, banana and pecan cookies", "Brown butter almond tuiles", "Gevulde Speculaas", "Speculaas biscuits", "Amaretti with honey and orange blossom", "Soft gingerbread tiles with rum butter glaze", "Soft date and oat bars", "Orange and star anise shortbread", "Chocolate and peanut butter s'mores", "'Anzac' biscuits (aka honey, oat and raisin cookies)", "Chocolate 'O' cookies", "Garibaldis", "Pecan snowballs", "Not-quite-Bonnie's rugelach", "Lime meringue cheesecakes", "White chocolate cheesecake with cranberry compote", "Passionfruit cheesecake with spiced pineapple", "Baked ricotta and hazelnut cheesecake", "Fig, orange and mascarpone cheesecake", "Chocolate banana ripple cheesecake", "Apricot and amaretto cheesecake", "Roasted strawberry and lime cheesecake", "Rhubarb and blueberry galette", "Little baked chocolate tarts with tahini and sesame brittle (or marmalade)", "Mont Blanc tarts", "Chai brûlée tarts", "Chocolate tart with hazelnut, rosemary and orange", "Walnut and black treacle tarts with crystallised sage", "Fig and pistachio frangipane tartlets", "Schiacciata with grapes and fennel seeds", "Apricot and thyme galettes with polenta pastry", "Pineapple tartlets with pandan and star anise", "Rum and raisin cake with rum caramel icing", "Prune cake with Armagnac and walnuts", "Parsnip and pecan cake with aniseed and orange", "Beetroot, ginger and soured cream cake", "Apple and olive oil cake with maple icing Vineyard cake (aka Cleopatra cake)", "Butternut, honey and almond", "Pineapple, pecan and currant", "Banana, date and walnut", "Grappa fruit cake", "Lemon and blackcurrant stripe cake", "Rhubarb and strawberry crumble cake", "Coconut, almond and blueberry cake", "Take-home chocolate cake", "Apricot and almond cake with cinnamon topping", "Pistachio roulade with raspberries and white chocolate", "Tropical fruit cake", "Pistachio and rose water semolina cake", "Festive fruit cake", "Flourless chocolate layer cake with coffee, walnuts and rose water", "Louise cake with plum and coconut", "Almond butter cake with cardamom and baked plums", "Pineapple and star anise chiffon cake", "Coffee and cardamom pound cake", "Neapolitan pound cake (for the family)", "Tessa's spice cake", "Lemon and poppy seed cake (National trust version)", "Belinda's flourless coconut and chocolate cake", "Celebration cake"];

  function getBooksToInclude(elements) {
    var booksToInclude = {};
    for (var i=0; i<elements.length; i++) {
      var element = elements[i];
      booksToInclude[element.name] = element.checked;
    }
    return booksToInclude;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var booksToInclude = getBooksToInclude(e.target.elements);
    var recipeSources = ['Plenty', 'Plenty-More', 'Simple', 'Sweet'];
    var recipeArrays = [plentyRecipes, plentyMoreRecipes, simpleRecipes, sweetRecipes];
    var recipes = [];
    recipeArrays.forEach(function(recipeArray, idx) {
      var recipeSource = recipeSources[idx];
      if (booksToInclude[recipeSource]) {
        var recipeNamesAndSources = recipeArray.map(function(recipeName) {
          return {
            recipeName,
            recipeSource
          };
        });
        recipes = recipes.concat(recipeNamesAndSources);
      }
    });
    if (recipes.length === 0) {
      resultRecipe.innerHTML = 'You need to select at least one book!';
      resultTheWordFrom.style.display = 'none';
      resultBookName.innerHTML = '';
    }
    else {
      var ingredientFilter = document.getElementById('ingredient-filter').value;
      if (ingredientFilter.replace(' ', '').length > 0) {
        recipes = recipes.filter(function(recipe) {
          return recipe.recipeName.toLowerCase().indexOf(ingredientFilter.toLowerCase()) >= 0;
        })
      }
      if (recipes.length > 0) {
        selectedRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        resultRecipe.innerHTML = selectedRecipe.recipeName;
        resultTheWordFrom.style.display = 'block';
        resultBookName.innerHTML = selectedRecipe.recipeSource.replace('-', ' ');
        submitButton.value = 'Another...';
      }
      else {
        resultRecipe.innerHTML = 'There are no recipes with that mentioned in the title!';
        resultTheWordFrom.style.display = 'none';
        resultBookName.innerHTML = '';
      }
    }
  });

  form.addEventListener('change', function(e) {
    var booksToInclude = getBooksToInclude(e.currentTarget.elements);
    var numberOfBooksSelected = Object.values(booksToInclude).reduce(function(total, element) {
      return (element) ? total += 1 : total;
    }, 0);
    if (numberOfBooksSelected === 1) {
      pluralisesCTA.style.display = 'none';
      singularisesCTA.style.display = 'inline';
    }
    else {
      pluralisesCTA.style.display = 'inline';
      singularisesCTA.style.display = 'none';
    }
  });
})();
