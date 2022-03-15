# Clases de Discord.js



## Collection

Es un objeto con claves  y valores que almacena información sobre un recurso (mensajes, usuarios, canales o reacciones etc..)

[Ver más sobre `Collection`](https://discord.js.org/#/docs/collection/main/class/Collection)

[Collections (anidiots.guide)](https://anidiots.guide/understanding/collections/)

## User

Representa un usuario en discord

```javascript
const user = await getServer().members.fetch("user_id");
```

[Ver más sobre `User`](https://discord.js.org/#/docs/discord.js/stable/class/User)

## 

## Message

Representa un mensaje enviado por un usuario en discord.

[Ver más sobre `Message`](https://discord.js.org/#/docs/discord.js/stable/class/Message?scrollTo=reactions)



## ReactionManager

Es la clase que se encargar de gestionar las reacciones que los usuarios hacen a los mensajes, la propiedad de `message.reactions` es un tipo `ReacionManager`.

```javascript
  const reactions = message.reactions.cache;
```

[Ver más sobre `ReactionManage` ](https://discord.js.org/#/docs/discord.js/stable/class/ReactionManager)



## MessageReaction

Representa una reacción especifica a un mensaje, a este objeto se puede acceder por medio de una iteración de colección.

```javascript
  const reactions = message.reactions.cache; // Collection
  
   reactions.find((reaction) => {
    // reaction es de tipo MessageReaction
    /*
     reaction.users.cache   <--   Collection
     reaction.emoji         <--   ReactionEmoji
    */
    
     // mostrar los nombres de los emojis de las reacciones
     console.log(reaction.emoji.name)
  });
```

[Ver más sobre `MessageReaction`](https://discord.js.org/#/docs/discord.js/stable/class/MessageReaction)



## ReactionEmoji

Representa un emoji, usualmente se usan para saber reacciones tienen emoijs.

```javascript
  const reactions = message.reactions.cache; // Collection
  
   reactions.find((reaction) => {
     // mostrar los nombres de los emojis de las reacciones
     console.log(reaction.emoji)
  });
```

[Ver más sobre `ReactionEmoji`](https://discord.js.org/#/docs/discord.js/stable/class/ReactionEmoji)



### ReactionUserManager

Permite administrar los usuarios quienes reaccionaron a un determinado emoji o mensaje

```javascript
 reactions.forEach((reaction) => {
     //  reaction.users   <--  ReactionUserManager
     reaction.users.remove(user_id);
 });
```

[Ver más sobre `ReactionUserManager`](https://discord.js.org/#/docs/discord.js/stable/class/ReactionUserManager)
