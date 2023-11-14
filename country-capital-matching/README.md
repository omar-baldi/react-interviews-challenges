### Country-capital matching challenge

---

In the game, the player needs to match a country to its capital by clicking on appropriate buttons.

1. Your component should receive a data property in the following format: an object where the keys are the names of the countries and the values are the capitals of each country. (e.g: `<CountryCapitalGame data={{ "Germany": "Berlin", "Denmark": "Copenhagen" }} />`).

2. A button should be rendered for each country and capitals. So following the example above, we would have 4 buttons: "Germany", "Berlin", "Denmark", "Copenhagen".

3. The buttons should be rendered in random order.

4. Clicking a button should set its background color to blue (#4009Bff).

5. Clicking another button should remove both buttons if a correct country is associated to its capital (correct pair selected) OR set the background color to each button selected to red if a wrong pair has been selected.

6. Assuming the previously selected pair was wrong, clicking another button should restore the default background color of the wrong pair and set the background color of the clicked button to blue (see point number 4).

7. When there are no buttons left, render a message saying: "Congratulations!".
