//importar o repositorio
import jogoRepository from '../repositories/jogoRepository.js'

//funçoes separadas para exemplo
export function getAllGames(req,res){
    const jogos = jogoRepository.readAll()
    res.status(200).json(jogos) 
}

export function getGameById(req,res){
    const id = req.params.id
    const jogo = jogoRepository.readById(id)
    res.status(200).json(jogo)
}

export function getGameByGenre(req,res){
    const genero = req.params.genero
    const jogos = jogoRepository.readByGenre(genero)
    res.status(200).json(jogos)
}
export function createGame(req,res){
    const jogo = req.body
    const resp = jogoRepository.create(jogo)
    res.status(200).json(resp)
}