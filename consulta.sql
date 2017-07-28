CREATE OR REPLACE FUNCTION public.spt_busca_arquivo(p_busca character varying)
RETURNS TABLE(codigo character varying, oricop character, pasta character varying, descricao text) LANGUAGE plpgsql
AS $function$
BEGIN
        RETURN query (select arq.codigo,arq.oricop,arq.pasta,arq.descricao
                      from arquivos as arq where setweight(to_tsvector(arq.descricao),'A') ||
					  setweight(to_tsvector(arq.codigo),'B') @@ plainto_tsquery('porrtuguese',p_busca)
					  order by arq.id);
        RETURN;
END;
$function$