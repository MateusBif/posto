import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const caminho = request.nextUrl.pathname;

  // Página de login
  if (caminho === "/admin/login") {
    if (user) {
      const { data: perfil } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (perfil?.role === "admin" || perfil?.role === "editor") {
        return NextResponse.redirect(
          new URL("/admin/dashboard", request.url)
        );
      }
    }

    return response;
  }

  // Bloquear usuários não autenticados
  if (!user) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // Verificar permissão do usuário
  const { data: perfil, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !perfil) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // Somente admin e editor podem acessar
  if (perfil.role !== "admin" && perfil.role !== "editor") {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};