"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import Link from "next/link";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterForm() {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
    password,
  } = useRegisterForm();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 450,
        borderRadius: 5,
        boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
        >
          Регистрация
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 4,
          }}
        >
          Создайте новый аккаунт
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            label="Имя"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              required: "Имя обязательно",
              minLength: { value: 2, message: "Минимум 2 символа" },
            })}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Введите корректный email",
              },
            })}
          />

          <TextField
            fullWidth
            label="Пароль"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Пароль обязателен",
              minLength: { value: 8, message: "Минимум 8 символов" },
            })}
          />

          <TextField
            fullWidth
            label="Подтвердите пароль"
            type="password"
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            {...register("passwordConfirm", {
              required: "Подтверждение пароля обязательно",
              validate: (value) =>
                value === password || "Пароли не совпадают",
            })}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{
              py: 1.6,
              borderRadius: 3,
              fontWeight: 600,
              mt: 1,
              textTransform: "none",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Зарегистрироваться"
            )}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Уже есть аккаунт?{" "}
            <Link
              href="/login"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Войти
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
// "use client";

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CssBaseline,
//   CircularProgress,
//   Container,
//   MenuItem,
//   TextField,
//   Typography,
//   Link as LinkMui
// } from "@mui/material";
// import Link from "next/link";

// import { useForm } from "react-hook-form";
// import { registerUser } from "@/services/authService";
// import { useRouter } from "next/navigation";
// export default function RegisterForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting }
//   } = useForm();
//   const router = useRouter();
//   const onSubmit = async data => {
//     try {
//       await registerUser(data);
//       router.replace("/dashboard");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <Card
//       sx={{
//         width: "100%",
//         maxWidth: 450,
//         borderRadius: 5,
//         boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
//       }}
//     >
//       <CardContent sx={{ p: 4 }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 700,
//             textAlign: "center",
//             mb: 1
//           }}
//         >
//           Регистрация
//         </Typography>

//         <Typography
//           variant="body2"
//           sx={{
//             textAlign: "center",
//             color: "text.secondary",
//             mb: 4
//           }}
//         >
//           Создайте новый аккаунт
//         </Typography>

//         <Box
//           component="form"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2
//           }}
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <TextField
//             {...register("name", {
//               required: "Name required",
//               minLength: {
//                 value: 2,
//                 message: "minimum 2 chars"
//               }
//             })}
//             fullWidth
//             label="Имя"
//           />

//           <TextField
//             fullWidth
//             label="Email"
//             type="email"
//             {...register("email")}
//           />

//           <TextField
//             {...register("password", {
//               required: "Password required",
//               minLength: {
//                 value: 8,
//                 message: "minimum 8 chars"
//               }
//             })}
//             fullWidth
//             label="Пароль"
//             type="password"
//           />

//           <TextField
//             {...register("passwordConfirm", {
//               required: "Password confirming required",
//               minLength: {
//                 value: 8,
//                 message: "minimum 8 chars"
//               }
//             })}
//             fullWidth
//             label="Подтвердите пароль"
//             type="password"
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             type="submit"
//             sx={{
//               py: 1.5,
//               borderRadius: 3,
//               fontWeight: 600,
//               mt: 1
//             }}
//           >
//             {isSubmitting ? (
//               <CircularProgress size={24} />
//             ) : (
//               "Зарегистрироваться"
//             )}
//           </Button>

//           <Typography
//             variant="body2"
//             sx={{
//               textAlign: "center",
//               mt: 2
//             }}
//           >
//             Уже есть аккаунт?
//             <Link
//               href="/login"
//               style={{
//                 marginLeft: 6,
//                 color: "#2563eb",
//                 textDecoration: "none",
//                 fontWeight: 600
//               }}
//             >
//               Войти
//             </Link>
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
