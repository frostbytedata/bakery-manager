import { MigrationInterface, QueryRunner } from 'typeorm';
import * as process from 'process';

export class SeedData9999999999999 implements MigrationInterface {
  name = 'SeedData9999999999999';
  transaction = false;

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (
      false && // Remove this line to insert the seed data
      process.env.NODE_ENV !== 'prd' &&
      process.env.NODE_ENV !== 'production'
    ) {
      // Create bootstrap user
      // Login: `parker@somegreatapp.com`
      // Password: `password`
      await queryRunner.query(`INSERT INTO public.user (id, email, password, salt)
                               VALUES (DEFAULT, 'parker@bakebox.app',
                                       '349d9d90ea62556d5df416fb91fac3d7dbc9461163f1e4df13a0f5d31e61e0abf39d8c36965d8498436967d3f89bcce6bb4bfca6e3679a9f62881bc6e18e2b5c',
                                       '23da02753f114cdd5099dc1d16df7a84b07bc28bb5d5ce8998b8e3cf51a05d10')`);
      // Create initial roles
      await queryRunner.query(
        `INSERT INTO public.role (id, name, description)
         VALUES (DEFAULT, 'superadmin', 'super administrators')`,
      );
      await queryRunner.query(
        `INSERT INTO public.role (id, name, description)
         VALUES (DEFAULT, 'admin', 'administrators')`,
      );
      await queryRunner.query(
        `INSERT INTO public.role (id, name, description)
         VALUES (DEFAULT, 'guest', 'guest account')`,
      );
      // Setting our bootstrap user to be a super admin
      await queryRunner.query(
        `INSERT INTO public.user_roles_role ("userId", "roleId")
         VALUES (1, 1)`,
      );
      // Adding some initial units for everyone to utilize
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Ounce', '', 'oz', 'weight', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Fluid Ounce', '', 'fl oz', 'weight', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Gram', '', 'g', 'weight', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Cup', '', 'cup', 'volume', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Tablespoon', '', 'tbsp', 'volume', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Teaspoon', '', 'tsp', 'volume', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Pound', '', 'lb', 'weight', true)`,
      );
      await queryRunner.query(
        `INSERT INTO public.unit (name, description, abbr, type, global)
         VALUES ('Individual', '', 'indv', 'volume', true)`,
      );
      // Adding some initial ingredients
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Milk 🥛', '2% Homogenized', 1, 2, 0.04)`,
      );
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Flour', 'White', 1, 7, 3)`,
      );
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Egg 🥚', 'Uncracked', 1, 8, 3)`,
      );
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Sugar', 'Cane', 1, 7, 2.50)`,
      );
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Raspberry', 'Fresh Fruit', 1, 3, 0.25)`,
      );
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Blueberry', 'Fresh Fruit', 1, 3, 0.35)`,
      );
      await queryRunner.query(
        `INSERT INTO public.ingredient (name, description, "userId", "defaultUnitId", cost)
         VALUES ('Chocolate Chips', 'Semi-sweet', 1, 1, 0.25)`,
      );
      // Adding some initial recipes
      await queryRunner.query(
        `INSERT INTO public.recipe (name, description, "userId", "retailPrice", "wholesalePrice")
         VALUES ('Blueberry Pie 🥧',
                 'Indulge in the delectable flavors of our freshly baked blueberry pie. The flaky, buttery crust perfectly encases a generous filling of sweet, juicy blueberries.',
                 1, 30, 20)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe (name, description, "userId", "retailPrice", "wholesalePrice")
         VALUES ('Raspberry Scones',
                 'Indulge in the sweet and tangy flavor of juicy raspberries baked into a soft and flaky scone. The tender, buttery dough is studded with plump, ruby red raspberries and a hint of zesty lemon zest, creating a delightful balance of flavors in every bite.',
                 1, 4.5, 3)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe (name, description, "userId", "retailPrice", "wholesalePrice")
         VALUES ('Chocolate Chip Cookies 🍪',
                 'A chunky home-made chocolate chip cookie, soft and chewy loaded with chocolate chips and made with love.',
                 1, 3, 2)`,
      );
      // Associate a few ingredients to recipes
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (1, 1, 16, 2)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (1, 2, 0.5, 7)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (1, 3, 2, 8)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (1, 6, 30, 3)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (2, 1, 16, 2)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (2, 2, 0.5, 7)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (2, 3, 2, 8)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (2, 5, 25, 3)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (3, 1, 16, 2)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (3, 2, 0.5, 7)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (3, 3, 2, 8)`,
      );
      await queryRunner.query(
        `INSERT INTO public.recipe_to_ingredient ("recipeId", "ingredientId", quantity, "unitId")
         VALUES (3, 7, 4, 1)`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (
      false && // Remove this line to enable the seed data removal
      process.env.NODE_ENV !== 'prd' &&
      process.env.NODE_ENV !== 'production'
    ) {
      // Remove initial seed data
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 1`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 2`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 3`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 4`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 5`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 6`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 7`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 8`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 9`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 10`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 11`);
      await queryRunner.query(`DELETE
                               FROM public.recipe_to_ingredient
                               WHERE id = 12`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 1`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 2`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 3`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 4`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 5`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 6`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 7`);
      await queryRunner.query(`DELETE
                               FROM public.ingredient
                               WHERE id = 8`);
      await queryRunner.query(`DELETE
                               FROM public.recipe
                               WHERE name = 'Blueberry Pie 🥧'`);
      await queryRunner.query(`DELETE
                               FROM public.recipe
                               WHERE name = 'Raspberry Scones'`);
      await queryRunner.query(`DELETE
                               FROM public.recipe
                               WHERE name = 'Chocolate Chip Cookies 🍪'`);
      // Adding some initial units for everyone to utilize
      await queryRunner.query(`DELETE
                               FROM public.unit
                               WHERE name = 'Ounce'`);
      await queryRunner.query(`DELETE
                               FROM public.unit
                               WHERE name = 'Fluid Ounce'`);
      await queryRunner.query(`DELETE
                               FROM public.unit
                               WHERE name = 'Gram'`);
      await queryRunner.query(`DELETE
                               FROM public.unit
                               WHERE name = 'Cup'`);
      await queryRunner.query(`DELETE
                               FROM public.unit
                               WHERE name = 'Tablespoon'`);
      await queryRunner.query(`DELETE
                               FROM public.unit
                               WHERE name = 'Teaspoon'`);
      await queryRunner.query(`DELETE
                               FROM public.user_roles_role
                               WHERE "userId" = 1
                                 AND "roleId" = 1`);
      await queryRunner.query(`DELETE
                               FROM public.role
                               WHERE name = 'superadmin'`);
      await queryRunner.query(`DELETE
                               FROM public.role
                               WHERE name = 'admin'`);
      await queryRunner.query(`DELETE
                               FROM public.role
                               WHERE name = 'guest'`);
      await queryRunner.query(`DELETE
                               FROM public.user
                               WHERE email = 'parker@bakebox.app'`);
    }
  }
}
