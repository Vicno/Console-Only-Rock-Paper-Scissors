const computerPlay = () => {
    const plays = ['rock', 'paper', 'scissors'];
    const option = Math.floor(Math.random() * 3);
    return plays[option];
}

const playerPlay = (currentTurn) => {
    playerMove = prompt(`Round ${currentTurn}, Pick either rock, paper or scissors!`)
    if (playerMove === null) {
        alert("Sorry to see you go, come back again!")
        return 'canceled';
    } else {
        let invalidMove = true;
        while (invalidMove) {
            let cleanedInput = playerMove.toLowerCase().trim().replace(/\s+/g, '')
            if (cleanedInput == 'rock' || cleanedInput == 'paper' || cleanedInput == 'scissors') {
                invalidMove = false;
                playerMove = cleanedInput;
                return playerMove
            } else {
                alert("OH NO! That is not a valid move!")
            }
        }
    }
}

const gameOver = (heroVictories, iaVictories) => {
    if (heroVictories > iaVictories) {
        alert(`GAME OVER! YOU WIN! WE ARE SAVED!`)
        return 'HERO'
    } else if (heroVictories < iaVictories) {
        alert(`GAME OVER! THE EVIL IA WON! WE ARE DOOMED!`)
        return 'AI'
    } else {
        alert(`GAME OVER! NO ONE WON! IT's A TIE!`)
        return 'TIE'
    }
}

const playRound = (playerSelection, computerSelection) => {
    const playerMove = playerSelection.toLowerCase()
    const computerMove = computerSelection
    const heroVictory = 'Hero wins!'
    const aiVictory = 'Evil AI Wins!'
    const tie = `It's a tie!`
    const rockWin = 'Rock beats Scissors!'
    const paperWin = 'Paper beats Rock!'
    const scissorWin = 'Scissors beats Paper!'
    switch (true) {
        case (playerMove === 'rock' && computerMove === 'rock'):
            return `${tie}, Rocks clash!`;
        case (playerMove === 'rock' && computerMove === 'paper'):
            return `${aiVictory}, ${paperWin}`
        case (playerMove === 'rock' && computerMove === 'scissors'):
            return `${heroVictory}, ${rockWin}`;
        case (playerMove === 'paper' && computerMove === 'rock'):
            return `${heroVictory}, ${paperWin}`;
        case (playerMove === 'paper' && computerMove === 'paper'):
            return `${tie}, Papers clash!`;
        case (playerMove === 'paper' && computerMove === 'scissors'):
            return `${aiVictory}, ${scissorWin}`;
        case (playerMove === 'scissors' && computerMove === 'rock'):
            return `${aiVictory}, ${rockWin}`;
        case (playerMove === 'scissors' && computerMove === 'paper'):
            return `${heroVictory}, ${scissorWin}`;
        case (playerMove === 'scissors' && computerMove === 'scissors'):
            return `${tie}, Scissors clash!`;
    }
}

const game = () => {
    const turns = 5;
    let currentTurn = 1
    let heroVictories = 0
    let iaVictories = 0
    let canceled = false
    alert("Oh no! An evil IA has taken control of your browser!")
    alert("To banish it you must beat it at a game of Rock, Paper, Scissors!")
    alert(`${turns} games will be played to determine the Victor! Or until one has won most rounds!`)


    while (currentTurn < turns || heroVictories < Math.ceil(turns / 2) && iaVictories < Math.ceil(turns / 2) && !canceled) {
        let playerMove = playerPlay(currentTurn)
        if (playerMove == 'canceled') {
            canceled = true;
            break;
        }
        else {
            let roundResult = playRound(playerMove, computerPlay())
            if (roundResult.includes('Hero')) {
                heroVictories++
            } else if (roundResult.includes('Evil')) {
                iaVictories++
            }
            alert(roundResult)
            alert(`Evil AI: ${iaVictories}, Hero: ${heroVictories}`)
            currentTurn++;
        }
    }
    return gameOver(heroVictories, iaVictories)
}

const continuePlayingResponse = (message) => {
    let invalidAnswer = true
    let continueInput = prompt(`${message} Yes/No`)
    if (continueInput === null) {
        alert("Sorry to see you go, come back again!")
        return 'cancel';
    } else {
        while (invalidAnswer) {
            let cleanedInput = continueInput.toLowerCase().trim().replace(/\s+/g, '')
            if (cleanedInput == 'yes' || cleanedInput == 'y' || cleanedInput == 'no' || cleanedInput == 'n') {
                invalidAnswer = false;
                return continueInput = cleanedInput;
            } else {
                alert("OH NO! That is not a valid answer!")
            }
        }
    }
}

const playAgain = (result) => {
    let message = ''
    switch (result) {
        case "HERO":
            message = 'The AI wants revenge, will you face it again?'
            break;
        case "AI":
            message = 'Not all hope is lost, will you try again?'
            break;
        case "TIE":
            message = 'Will you leave the AI alone or will you try again?'
            break;
    }
    let continueInput = continuePlayingResponse(message)
    if(continueInput === 'cancel'){
        continuePlaying = false;
    } else {
        if (continueInput == 'yes' || continueInput == 'y') {
            alert("Here we go again!")
            continuePlaying = true;
        } else if (continueInput == 'no' || continueInput == 'n') {
            continuePlaying = false;
            alert("OK, Come back again soon!")
        }
    }
    return continuePlaying
}

const startGame = () => {
    let continuePlaying = true;
    while (continuePlaying) {
        let result = game()
        continuePlaying = playAgain(result)
    }
}

startGame()