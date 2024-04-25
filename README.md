# Конфигурация

## Конфигурационный файл .local.env 

1. `NEXT_PUBLIC_GRAPHQL`: URL для подключения к серверу GraphQL.

2. `NEXT_PUBLIC_CLOUDINARY_ACC`: API ключ для доступа к сервису Cloudinary, который обеспечивает возможность загрузки и управления мультимедийными файлами.

3. `NEXT_PUBLIC_PROD_IMAGES_ROOT`: Корневой путь к изображениям на продуктивном сервере.

4. `NEXT_PUBLIC_PROD_NAME_INCLUDED_PART`: Некоторая часть строки, которая включается в имена продуктов на продуктивном сервере.

5. `NEXT_PUBLIC_UNUSUAL_LOCALES`: Список локалей (не en-US), для которых предусмотрен перевод (записывается через ',').

6. `NEXT_PUBLIC_REVIEWS_ACCESS`: Уровень доступа к отзывам.

7. `NEXT_PUBLIC_CURRENCY_FETCH`: URL для получения информации о валютах.

8. `NEXT_PUBLIC_CURRENCY_PERCENT_DIFF`: Процентное изменение валюты.

Чтобы использовать эти переменные окружения в вашем проекте, вы можете обратиться к ним с помощью `process.env`. Например:

```javascript
const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL;
const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
// И так далее...
```


<!-- ## Access to NPM Packages

To enable access to NPM packages from IST ELEVATOR, follow these steps:

1. **Add a `.npmrc` File:**

   Add a `.npmrc` file to the root of your project with the following content:

   ```
   //npm.pkg.github.com/:_authToken=TOKEN
   ```

   Make sure to replace `TOKEN` with the correct token that grants you sufficient rights to access packages from IST ELEVATOR.

   This token provides authentication when fetching packages from the GitHub NPM registry.

2. **Verify Token:**

   Ensure that the specified token is valid and grants the necessary permissions to retrieve packages. -->

