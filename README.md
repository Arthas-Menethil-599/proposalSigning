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


## VerifyLeaf

Функция verifyLeaf выполняет проверку листа в дереве Merkle и возвращает значение типа bool, указывающее, принадлежит ли указанный лист дереву Merkle.

Входные параметры функции:

leaf: значение листа, который требуется проверить.
proof: массив, содержащий значения доказательства, необходимые для проверки листа.
Работа функции заключается в выполнении следующих шагов:

Начальное значение переменной hash устанавливается равным значению проверяемого листа leaf.

Для каждого элемента proofElement в массиве proof вычисляется новое значение hash путем объединения текущего значения hash с proofElement и хэширования результата.
Если hash равен корню дерева Merkle, то функция возвращает true, иначе false.

Таким образом, функция verifyLeaf используется для проверки, принадлежит ли определенный лист дереву Merkle, на основе значения листа и доказательства, в котором указано расположение листа в дереве. Эта функция может быть использована для проверки подлинности данных, таких как транзакции или участники в airdrop-программах, используя дерево Merkle в качестве инструмента безопасности.

![image](https://user-images.githubusercontent.com/66798677/228098562-54cd1cf7-5a8f-4b87-bf68-91eed4c520ce.png)

Для того чтобы воспользоваться verifyLeaf, вам достаточно ввести в первое поле адрес и во второе пруфы которые доказывают принадлежность адреса к MerkleTree, соотвественно к айрдропу (токендропу). Таким образом при верном вводе данных и подтверждением принадлежности всплывёт данное окно:

![image](https://user-images.githubusercontent.com/66798677/228097066-1bdc9253-3da5-4645-a9a9-05ec26a06520.png)

Визуально подверждающее вашу принадлежность к айрдропу.

Адреса используются заранее установленные для данного айрдропа, также в самом коде смарт-контракта в комментариях указаны входные данные для теста
![image](https://user-images.githubusercontent.com/66798677/228097259-a93d8fd5-d944-4c3b-848d-fc5dffde7e7b.png)

Также в случае неверных данных, или отсуствием вашей принадлежности к айрдропу выходит данный визуальный элемент в виде notification.
![image](https://user-images.githubusercontent.com/66798677/228097454-b3b56daf-211c-4606-9220-729d352fbd2b.png)


![image](https://user-images.githubusercontent.com/66798677/228098723-f8c1ba3c-0e90-47c6-a133-f72f6761a36d.png)

## Claim

Функция claim позволяет участникам получить токены в рамках airdrop-программы.

Входной параметр функции:

_proof: массив значений, содержащий доказательство принадлежности адреса пользователя к дереву Merkle.
Работа функции заключается в выполнении следующих шагов:

Вызов require, который проверяет, что адрес, от имени которого выполняется функция claim, еще не запросил выплату токенов. Если адрес уже запросил выплату, функция будет остановлена и возвратит сообщение об ошибке.

Создание хэша leaf на основе адреса, от имени которого выполняется функция, с помощью функции keccak256.

Вызов функции verifyLeaf для проверки того, что хэш leaf принадлежит дереву Merkle. Если доказательство _proof не соответствует указанному листу leaf в дереве, функция будет остановлена и возвратит сообщение об ошибке.

Установка значения флага claimed[msg.sender] в true, чтобы пометить, что адрес уже получил свою долю токенов.

Вызов внутренней функции _mint, которая выполняет выпуск новых токенов и отправляет их на адрес, от имени которого выполняется функция.

Таким образом, функция claim проверяет, что пользователь имеет право на получение токенов в рамках airdrop-программы, на основе его адреса и доказательства принадлежности к дереву Merkle, и выпускает токены на его адрес. Если адрес уже запросил выплату токенов, функция вернет сообщение об ошибке.

В случае с Claim, нужно ввести пруфы, а именно соседние хеши соседних адресов, которые также прописаны в комментариях смарт-контракта:
![image](https://user-images.githubusercontent.com/66798677/228097748-47663a68-8f88-418f-a571-2a3a65024af4.png)

Также имеются такие же визуальные элементы подверждающие успешную отправку токенов или неуспешную.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
