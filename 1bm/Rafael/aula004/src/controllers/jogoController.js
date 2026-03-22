//importar repoitorio
import jogoRepository from '../repositories/jogoRepository.js';

//funções separadas para exemplo
export function getAllGames(req,res){
    const jogos = jogoRepository.readAll()
    res.status(200).json(jogos)
}
//função para pegar jogo por id
export function getGameById(req,res){
    const id = req.params.id
    const jogo = jogoRepository.readById(id)
    res.status(200).json(jogo)
}
//função para pegar o jogo por genero
export function getGameByGenre(req,res){
    const genero = req.params.genero
    const jogo = jogoRepository.readByGenre(genero)
    res.status(200).json(jogo)
}
//função para pegar O JOGO por classificação
export function getGameByRating(req,res){
    const classificacao_indicativa = req.params.classificacao_indicativa
    const jogo = jogoRepository.readRating(classificacao_indicativa)
    res.status(200).json(jogo)
}
//funçaõ para pegar o jogo por idioma
export function getGameByLanguage(req,res){
    const idiomas_disponiveis = req.params.idiomas_disponiveis
    const jogo = jogoRepository.readLanguage(idiomas_disponiveis)
    res.status(200).json(jogo)
}