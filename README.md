# Development
Pasos para levantar la app en desarrollo

0. Ejecutar el comando
```
npx prisma init
```

1. levantar la base de datos
```
https://console.neon.tech/app/projects
```

2. Reemplezar el DATABASE_URL por el que aparece en Neon.tech en el archivo .env
```
DATABASE_URL="postgresql://raev0hardcore:O7f2rYHwaXDR@ep-tiny-wind-a5ysgymj.us-east-2.aws.neon.tech/todos-db?schema=todo?sslmode=require&pgbouncer=true"
```

3. Agregar el DATABASE_URL en el objeto datasource db en el archivo schema.prisma
```
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
}
```

4. Ejecutar los Prisma Commands
```
npx prisma generate
npx prisma migrate dev
```

5. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

# Prisma Commands
Comando para sincronizar el archivo shema.prisma con los schemas de la base de datos
```
npx prisma db pull 
```

Comando para sincronizar la base de datos con los schemas del archivo shema.prisma (purga la base de datos)
```
npx prisma migrate dev 
```


Comando para sincronizar la base de datos con los schemas del archivo shema.prisma (sin purgar la base de datos)
```
npx prisma db push
```



# Production



# Staging