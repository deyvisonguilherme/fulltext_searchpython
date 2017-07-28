window.document.getElementsByTagName('button')[0].addEventListener('click', function (e) 
{
    e.preventDefault();
    const txtPesquisa = window.document.getElementsByTagName('input')[0];

    if (txtPesquisa.value == '' || txtPesquisa.value == null) 
	{
        window.document.getElementById('result').innerHTML = "Campo de pesquisa vazio";
    } else 
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "http://10.0.9.219:5000/orders/"+txtPesquisa.value, true);

		xhr.responseType = 'json';

		xhr.onload = function () 
		{
			if (xhr.readyState === xhr.DONE) 
			{
				var tabela = "<table>";
				    tabela += "<tr><th>codigo</th>";
					tabela += "<th>oricop</th>";
					tabela += "<th>pasta</th>";
					tabela += "<th>descricao</th></tr>";
				if (xhr.status === 200)
				{ 
					const arquivos = xhr.response.arquivos;
					if(arquivos.length > 0 )
					{
						for(let i = 0; i < arquivos.length; i++)
						{
							tabela += "<tr>";
							for(let x = 0; x < 4; x++)
							{
								tabela += "<td>"+arquivos[i][x]+"</td>";
							}
							tabela += "</tr>";
						}
					}
					else
					{
						tabela = "<p>Nenhum registro encontrado</p>";
					}
					window.document.getElementById('result').innerHTML = tabela;
				}
			}
		};
		xhr.send(null);
	}
});


