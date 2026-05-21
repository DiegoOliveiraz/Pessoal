import jogoRepository from "../repositories/jogoRepository.js";

export function getAllGames(req, res) {
  const jogos = jogoRepository.readAll();
  res.status(200).json(jogos);
}

export function getGameById(req, res) {
  const id = req.params.id;
  const jogo = jogoRepository.readById(id);
  res.status(200).json(jogo);
}

export function getGameByGenre(req, res) {
  const genero = req.params.genero;
  const jogos = jogoRepository.readByGenre(genero);
  res.status(200).json(jogos);
}

export function getGameByRating(req, res) {
  const classificacao_indicativa = req.params.classificacao_indicativa;
  const jogo = jogoRepository.readRating(classificacao_indicativa);
  res.status(200).json(jogo);
}

export function getGameByLanguage(req, res) {
  const idiomas_disponiveis = req.params.idiomas_disponiveis;
  const jogo = jogoRepository.readLanguage(idiomas_disponiveis);
  res.status(200).json(jogo);
}

export function createGame(req, res) {
  const jogo = req.body;
  const resp = jogoRepository.create(jogo);
  res.status(200).json(resp);
}

export function editGame(req, res) {
  const jogo = req.body;
  const id = req.params.id;
  jogo.id = parseInt(id);
  const resp = jogoRepository.edit(jogo);
  res.status(200).json(resp);
  if(!jogo){
    res.status(404).json({
      ok: false,
      error: ["Id não encontrado"],
    })
  }
}

export function deleteGame(req, res){
  const id = req.params.id;
  const resp = jogoRepository.delete(id);
  res.status(200).json(resp);
  if(!jogo){
    res.status(404).json({
      ok: false,
      error: ["Jogo não encontrado"],
    });
  }
}
