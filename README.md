TokenDrop - это смарт-контракт на блокчейне BNB testnet, который позволяет распределять токены ERC20 по списку адресов BNB testnet. Это может быть полезно для различных целей, таких как айрдроп, раздача токенов или поощрительные программы.

## Для начала:

Запустите сервер разработки с помощью комманд:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) с помощью браузера, чтобы увидеть результат.

![image](https://user-images.githubusercontent.com/66798677/228096730-f68ac301-de11-4789-a24a-919305866909.png)

Для того чтобы воспользоваться verifyLeaf, вам достаточно ввести в первое поле адрес и во второе пруфы которые доказывают принадлежность адреса к MerkleTree, соотвественно к айрдропу (токендропу). Таким образом при верном вводе данных и подтверждением принадлежности всплывёт данное окно:

![image](https://user-images.githubusercontent.com/66798677/228097066-1bdc9253-3da5-4645-a9a9-05ec26a06520.png)

Визуально подверждающее вашу принадлежность к айрдропу.

Адреса используются заранее установленные для данного айрдропа, также в самом коде смарт-контракта в комментариях указаны входные данные для теста
![image](https://user-images.githubusercontent.com/66798677/228097259-a93d8fd5-d944-4c3b-848d-fc5dffde7e7b.png)

Также в случае неверных данных, или отсуствием вашей принадлежности к айрдропу выходит данный визуальный элемент в виде notification.
![image](https://user-images.githubusercontent.com/66798677/228097454-b3b56daf-211c-4606-9220-729d352fbd2b.png)


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
