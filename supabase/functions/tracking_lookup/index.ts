import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const codigo = typeof body?.codigo === 'string' ? body.codigo.trim() : '';
    const telefono = typeof body?.telefono === 'string' ? body.telefono.trim() : '';

    if (codigo.length < 8 || codigo.length > 80 || telefono.length < 6 || telefono.length > 32) {
      return new Response(JSON.stringify({ ok: false, error: 'invalid_input' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const url = Deno.env.get('SUPABASE_URL');
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !service) {
      return new Response(JSON.stringify({ ok: false, error: 'service_unavailable' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }

    const supabase = createClient(url, service, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from('solicitudes')
      .select('codigo_seguimiento,tipo_trabajo,estado,updated_at')
      .eq('codigo_seguimiento', codigo)
      .eq('telefono', telefono)
      .maybeSingle();

    if (error || !data) {
      return new Response(JSON.stringify({ ok: false, error: 'not_found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, solicitud: data }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'bad_request' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
});
