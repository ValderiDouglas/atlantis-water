from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'atvv.db')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"], supports_credentials=True)

db = SQLAlchemy(app)

class Documento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(20), nullable=False)
    numero = db.Column(db.String(50), nullable=False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    nome_social = db.Column(db.String(120))
    data_nascimento = db.Column(db.String(10))
    rua = db.Column(db.String(120))
    numero = db.Column(db.String(20))
    bairro = db.Column(db.String(50))
    cidade = db.Column(db.String(50))
    estado = db.Column(db.String(2))
    telefones = db.relationship('Telefone', backref='cliente', cascade="all, delete-orphan")
    documentos = db.relationship('Documento', backref='cliente', cascade="all, delete-orphan")
    dependentes = db.relationship('Dependente', backref='titular', cascade="all, delete-orphan")

class Telefone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ddd = db.Column(db.String(3))
    numero = db.Column(db.String(20))
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))

class Dependente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    nome_social = db.Column(db.String(120))
    data_nascimento = db.Column(db.String(10))
    documentos = db.Column(db.JSON) 
    titular_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))

class Acomodacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    qtd_camas_solteiro = db.Column(db.Integer, default=0)
    qtd_camas_casal = db.Column(db.Integer, default=0)
    qtd_suites = db.Column(db.Integer, default=0)
    climatizacao = db.Column(db.Boolean, default=False)
    vagas_garagem = db.Column(db.Integer, default=0)

class Hospedagem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titular_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    acomodacao_id = db.Column(db.Integer, db.ForeignKey('acomodacao.id'))
    data_entrada = db.Column(db.String(10))
    data_saida = db.Column(db.String(10), nullable=True)
    dependentes = db.relationship('HospedagemDependente', backref='hospedagem', cascade="all, delete-orphan")

class HospedagemDependente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hospedagem_id = db.Column(db.Integer, db.ForeignKey('hospedagem.id'))
    dependente_id = db.Column(db.Integer, db.ForeignKey('dependente.id'))

with app.app_context():
    db.create_all()

def cliente_to_dict(cliente):
    return {
        "id": cliente.id,
        "nome": cliente.nome,
        "nome_social": cliente.nome_social,
        "data_nascimento": cliente.data_nascimento,
        "endereco": {
            "rua": cliente.rua,
            "numero": cliente.numero,
            "bairro": cliente.bairro,
            "cidade": cliente.cidade,
            "estado": cliente.estado
        },
        "telefones": [{"ddd": t.ddd, "numero": t.numero} for t in cliente.telefones],
        "documentos": [{"tipo": d.tipo, "numero": d.numero} for d in cliente.documentos]
    }

def dependente_to_dict(dep):
    titular = Cliente.query.get(dep.titular_id)
    return {
        "id": dep.id,
        "nome": dep.nome,
        "nome_social": dep.nome_social,
        "data_nascimento": dep.data_nascimento,
        "documentos": dep.documentos or [],
        "titular_id": dep.titular_id,
        "endereco": {
            "rua": titular.rua,
            "numero": titular.numero,
            "bairro": titular.bairro,
            "cidade": titular.cidade,
            "estado": titular.estado
        } if titular else {},
        "telefones": [{"ddd": t.ddd, "numero": t.numero} for t in titular.telefones] if titular else []
    }

def acomodacao_to_dict(a):
    return {
        "id": a.id,
        "nome": a.nome,
        "qtd_camas_solteiro": a.qtd_camas_solteiro,
        "qtd_camas_casal": a.qtd_camas_casal,
        "qtd_suites": a.qtd_suites,
        "climatizacao": a.climatizacao,
        "vagas_garagem": a.vagas_garagem
    }

def hospedagem_to_dict(h):
    return {
        "id": h.id,
        "titular_id": h.titular_id,
        "acomodacao_id": h.acomodacao_id,
        "data_entrada": h.data_entrada,
        "data_saida": h.data_saida,
        "dependentes": [d.dependente_id for d in h.dependentes]
    }

@app.route("/clientes", methods=["GET"])
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente_to_dict(c) for c in clientes])

@app.route("/clientes", methods=["POST"])
def add_cliente():
    data = request.json
    cliente = Cliente(
        nome=data["nome"],
        nome_social=data.get("nome_social", ""),
        data_nascimento=data.get("data_nascimento", ""),
        rua=data["endereco"]["rua"],
        numero=data["endereco"]["numero"],
        bairro=data["endereco"]["bairro"],
        cidade=data["endereco"]["cidade"],
        estado=data["endereco"]["estado"]
    )
    db.session.add(cliente)
    db.session.commit()
    for tel in data.get("telefones", []):
        t = Telefone(ddd=tel["ddd"], numero=tel["numero"], cliente_id=cliente.id)
        db.session.add(t)
    for doc in data.get("documentos", []):
        d = Documento(tipo=doc["tipo"], numero=doc["numero"], cliente_id=cliente.id)
        db.session.add(d)
    db.session.commit()
    return jsonify(cliente_to_dict(cliente)), 201

@app.route("/clientes/<int:id>", methods=["PUT"])
def update_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    data = request.json
    cliente.nome = data["nome"]
    cliente.nome_social = data.get("nome_social", "")
    cliente.data_nascimento = data.get("data_nascimento", "")
    cliente.rua = data["endereco"]["rua"]
    cliente.numero = data["endereco"]["numero"]
    cliente.bairro = data["endereco"]["bairro"]
    cliente.cidade = data["endereco"]["cidade"]
    cliente.estado = data["endereco"]["estado"]
    Telefone.query.filter_by(cliente_id=cliente.id).delete()
    for tel in data.get("telefones", []):
        t = Telefone(ddd=tel["ddd"], numero=tel["numero"], cliente_id=cliente.id)
        db.session.add(t)
    Documento.query.filter_by(cliente_id=cliente.id).delete()
    for doc in data.get("documentos", []):
        d = Documento(tipo=doc["tipo"], numero=doc["numero"], cliente_id=cliente.id)
        db.session.add(d)
    db.session.commit()
    return jsonify(cliente_to_dict(cliente))

@app.route("/clientes/<int:id>", methods=["DELETE"])
def delete_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    db.session.delete(cliente)
    db.session.commit()
    return '', 204

@app.route("/dependentes", methods=["GET"])
def get_dependentes():
    dependentes = Dependente.query.all()
    return jsonify([dependente_to_dict(d) for d in dependentes])

@app.route("/dependentes", methods=["POST"])
def add_dependente():
    data = request.json
    dep = Dependente(
        nome=data["nome"],
        nome_social=data.get("nomeSocial", ""),
        data_nascimento=data.get("dataNascimento", ""),
        documentos=data.get("documentos", []),
        titular_id=data["titularId"]
    )
    db.session.add(dep)
    db.session.commit()
    return jsonify(dependente_to_dict(dep)), 201

@app.route("/dependentes/<int:id>", methods=["PUT"])
def update_dependente(id):
    dep = Dependente.query.get_or_404(id)
    data = request.json
    dep.nome = data["nome"]
    dep.nome_social = data.get("nomeSocial", "")
    dep.data_nascimento = data.get("dataNascimento", "")
    dep.documentos = data.get("documentos", [])
    dep.titular_id = data["titularId"]
    db.session.commit()
    return jsonify(dependente_to_dict(dep))

@app.route("/dependentes/<int:id>", methods=["DELETE"])
def delete_dependente(id):
    dep = Dependente.query.get_or_404(id)
    db.session.delete(dep)
    db.session.commit()
    return '', 204

@app.route("/acomodacoes", methods=["GET"])
def get_acomodacoes():
    acoms = Acomodacao.query.all()
    return jsonify([acomodacao_to_dict(a) for a in acoms])

@app.route("/acomodacoes", methods=["POST"])
def add_acomodacao():
    data = request.json
    a = Acomodacao(
        nome=data.get("nome") or data.get("tipo") or "",
        qtd_camas_solteiro=data.get("qtd_camas_solteiro") or data.get("solteiro") or 0,
        qtd_camas_casal=data.get("qtd_camas_casal") or data.get("casal") or 0,
        qtd_suites=data.get("qtd_suites") or data.get("suites") or 0,
        climatizacao=data.get("climatizacao", False),
        vagas_garagem=data.get("vagas_garagem") or data.get("garagem") or 0
    )
    db.session.add(a)
    db.session.commit()
    return jsonify(acomodacao_to_dict(a)), 201

@app.route("/acomodacoes/<int:id>", methods=["PUT"])
def update_acomodacao(id):
    a = Acomodacao.query.get_or_404(id)
    data = request.json
    a.nome = data["nome"]
    a.qtd_camas_solteiro = data["qtd_camas_solteiro"]
    a.qtd_camas_casal = data["qtd_camas_casal"]
    a.qtd_suites = data["qtd_suites"]
    a.climatizacao = data["climatizacao"]
    a.vagas_garagem = data["vagas_garagem"]
    db.session.commit()
    return jsonify(acomodacao_to_dict(a))

@app.route("/acomodacoes/<int:id>", methods=["DELETE"])
def delete_acomodacao(id):
    a = Acomodacao.query.get_or_404(id)
    db.session.delete(a)
    db.session.commit()
    return '', 204

@app.route("/hospedagens", methods=["GET"])
def get_hospedagens():
    hospedagens = Hospedagem.query.all()
    return jsonify([hospedagem_to_dict(h) for h in hospedagens])

@app.route("/hospedagens", methods=["POST"])
def add_hospedagem():
    data = request.json
    h = Hospedagem(
        titular_id=data["titular_id"],
        acomodacao_id=data["acomodacao_id"],
        data_entrada=data["data_entrada"],
        data_saida=data.get("data_saida")
    )
    db.session.add(h)
    db.session.commit()
    for dep_id in data.get("dependentes", []):
        hd = HospedagemDependente(hospedagem_id=h.id, dependente_id=dep_id)
        db.session.add(hd)
    db.session.commit()
    return jsonify(hospedagem_to_dict(h)), 201

@app.route("/hospedagens/<int:id>", methods=["PUT"])
def update_hospedagem(id):
    h = Hospedagem.query.get_or_404(id)
    data = request.json
    h.titular_id = data["titular_id"]
    h.acomodacao_id = data["acomodacao_id"]
    h.data_entrada = data["data_entrada"]
    h.data_saida = data.get("data_saida")
    HospedagemDependente.query.filter_by(hospedagem_id=h.id).delete()
    for dep_id in data.get("dependentes", []):
        hd = HospedagemDependente(hospedagem_id=h.id, dependente_id=dep_id)
        db.session.add(hd)
    db.session.commit()
    return jsonify(hospedagem_to_dict(h))

@app.route("/hospedagens/<int:id>", methods=["DELETE"])
def delete_hospedagem(id):
    h = Hospedagem.query.get_or_404(id)
    db.session.delete(h)
    db.session.commit()
    return '', 204

@app.route("/hospedagens/<int:id>/finalizar", methods=["PUT"])
def finalizar_hospedagem(id):
    h = Hospedagem.query.get_or_404(id)
    data = request.json or {}
    from datetime import datetime
    h.data_saida = data.get("data_saida") or datetime.now().strftime("%Y-%m-%d")
    db.session.commit()
    return jsonify(hospedagem_to_dict(h))

if __name__ == "__main__":
    app.run(debug=True)
